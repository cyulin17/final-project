# Go-To-Japan

A full stack web application for travelers to Japan who want to make travel itineraries.

## Live Demo

https://go-to-japan.herokuapp.com/

![alt text](https://github.com/cyulin17/go-to-japan/blob/master/server/public/images/Go-To-Japan1.gif)

![alt text](https://github.com/cyulin17/go-to-japan/blob/master/server/public/images/Go-To-Japan2.gif)

## Technologies Used

- React.js
- HTML5
- CSS
- Bootstrap 5
- JavaScript
- PostgreSQL
- Node.js
- Webpack
- Heroku
- [Google Map API](https://developers.google.com/maps/documentation)
- [google-map-react](https://www.npmjs.com/package/google-map-react)

## Features

- Users can search for activities using area criteria. 
- Users can search for activities using categories.
- Users can search for activities using keywords. 
- Users can view details of destination. 
- Users can add an activity to the itinerary.
- Users can delete activities.
- Users can create an account and sign in.

## Stretch Features

- Users can view the directions.
- Travel itinerary can be shared. 


## System Requirements

- Node.js 16 or higher
- NPM 8 or higher
- PostgreSQL 12 or higher

## Getting Started

1. Clone the repository.
   ```shell
    git clone git@github.com:cyulin17/go-to-japan.git
    cd go-to-japan
   ```

2. Install all dependcies with NPM.
   ```shell
    npm install
   ```
   
3. Create and import database
   ```shell
    createdb GoToJapan
    npm run db:import
   ```

4. Go to [Google Map Platform](https://mapsplatform.google.com/) and create an account to obtain an API key. 

5. Make a copy of the `.env.example` named `.env`. Update the `Database name`, `TOKEN_SECRET` and add `GOOGLE_TOKEN=YOUR-API-KEY`.

6. Start the `postgresql` server.
   ```shell
    sudo service postgresql start
   ```

7. Start the project. Once started you can view the application by opening (http://localhost:3000) in your browser.

    ```shell
     npm run dev
    ```












