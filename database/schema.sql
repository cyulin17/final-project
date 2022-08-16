set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

drop schema "public" cascade;
create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "places" (
  "placeId" serial NOT NULL,
  "destination" TEXT NOT NULL,
  "tripDate" DATE NOT NULL,
  "tripStartTime" time NOT NULL,
  "tripEndTime" time NOT NULL,
  "photo" TEXT,
  "userId" integer NOT NULL,
  CONSTRAINT "places_pk" PRIMARY KEY ("placeId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "dates" (
  "tripId" serial NOT NULL,
  "tripStartDate" DATE NOT NULL,
  "tripEndDate" DATE NOT NULL,
  "userId" integer NOT NULL,
  CONSTRAINT "dates_pk" PRIMARY KEY ("tripId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "places" ADD CONSTRAINT "places_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "dates" ADD CONSTRAINT "dates_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
