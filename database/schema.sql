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
	"password" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "places" (
	"placeId" serial NOT NULL,
	"destination" TEXT NOT NULL,
	"startTime" timestamptz NOT NULL,
	"endTime" timestamptz NOT NULL,
	"userId" integer NOT NULL,
	"googlePlaceId" TEXT NOT NULL,
	"categoryId" integer NOT NULL,
	"areaId" integer NOT NULL,
	CONSTRAINT "places_pk" PRIMARY KEY ("placeId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "categories" (
  "categoryId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "areas" (
	"areaId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "areas_pk" PRIMARY KEY ("areaId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "places" ADD CONSTRAINT "places_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "places" ADD CONSTRAINT "places_fk1" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "places" ADD CONSTRAINT "places_fk2" FOREIGN KEY ("areaId") REFERENCES "areas"("areaId");
