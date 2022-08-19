require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/users', (req, res, next) => {
  const { email } = req.body;
  const sql = `
    select
      "firstName",
      "lastName",
      "email"
      from "users"
      where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-up', (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required.');
  }

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("firstName", "lastName", "email", "hashedPassword")
        values ($1, $2, $3, $4)
        returning *
      `;
      const params = [firstname, lastname, email, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });

        })
        .catch(err => next(err));

    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/places', (req, res, next) => {
  const { userId } = req.user;
  const { tripDate, tripStartTime, tripEndTime, destination, photo } = req.body;

  if (!tripStartTime) {
    throw new ClientError(400, 'Please enter a Time.');
  }

  const sql = `
  insert into "places" ("userId", "tripDate","tripStartTime", "tripEndTime","destination","photo")
  values ($1, $2, $3, $4, $5, $6)
  returning
    "placeId",
    "userId",
    to_char("tripDate", 'YYYY-MM-DD') as "tripDate",
    to_char("tripStartTime", 'HH24:MI') as "tripStartTime",
    to_char("tripEndTime", 'HH24:MI') as "tripEndTime",
    "destination",
    "photo"
`;
  const params = [userId, tripDate, tripStartTime, tripEndTime, destination, photo];

  db.query(sql, params)
    .then(result => {
      const [itinerary] = result.rows;
      res.status(201).json(itinerary);
    });
});

app.get('/api/places', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select
      "placeId",
      "userId",
      to_char("tripDate", 'YYYY-MM-DD') as "tripDate",
      to_char("tripStartTime", 'HH24:MI') as "tripStartTime",
      to_char("tripEndTime", 'HH24:MI') as "tripEndTime",
      "destination",
      "photo"
      from "places"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/places/:placeId', (req, res, next) => {
  const placeId = parseInt(req.params.placeId, 10);

  if (!Number.isInteger(placeId) || placeId < 1) {
    throw new ClientError(400, 'placeId must be a positive integer');
  }
  const sql = `
    delete from "places"
     where "placeId" = $1
     returning *
  `;

  const params = [placeId];
  db.query(sql, params)
    .then(result => {
      const [deletePlace] = result.rows;
      if (!deletePlace) {
        throw new ClientError(404, `cannot find place with placeId ${placeId}`);
      } else {
        res.sendStatus(204);
      }

    })
    .catch(err => next(err));
});

app.post('/api/dates', (req, res, next) => {
  const { userId } = req.user;
  const { tripStartDate, tripEndDate } = req.body;

  const sql = `
  insert into "dates" ("userId", "tripStartDate", "tripEndDate")
  values ($1, $2, $3)
  returning
    "tripId",
    "userId",
    to_char("tripStartDate", 'YYYY-MM-DD') as "tripStartDate",
    to_char("tripEndDate", 'YYYY-MM-DD') as "tripEndDate"
`;
  const params = [userId, tripStartDate, tripEndDate];

  db.query(sql, params)
    .then(result => {
      const [trip] = result.rows;
      res.status(201).json(trip);
    });
});

app.get('/api/dates/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (!Number.isInteger(userId) || userId < 1) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    select
      "tripId",
      "userId",
      to_char("tripStartDate", 'YYYY-MM-DD') as "tripStartDate",
      to_char("tripEndDate", 'YYYY-MM-DD') as "tripEndDate"
      from "dates"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
