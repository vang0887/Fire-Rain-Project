-- Create fire_summary table
CREATE TABLE fire_summary (
  fire_name text,
  county text,
  acres int,
  hectares int
);

-- Create (SUMMARY) rainfall table 
CREATE TABLE summary_rainfall (
  county text,
  Maximum float,
  MaxDate date,
  Minimum float,
  Mean float,
  Median float
);

-- Create (YEAR) rainfall table 
CREATE TABLE year_rainfall (
  reading date,
  rainfall float,
  county text,
  fire_name text
);

-- Create (THREE MONTH) rainfall table 
CREATE TABLE three_month_rainfall (
  reading date,
  rainfall float,
  county text,
  fire_name text
);

-- Add primary key
ALTER TABLE fire_summary
ADD COLUMN id SERIAL PRIMARY KEY;

-- Add primary key
ALTER TABLE summary_rainfall
ADD COLUMN id SERIAL PRIMARY KEY;

-- Add primary key
ALTER TABLE year_rainfall
ADD COLUMN id SERIAL PRIMARY KEY;

-- Add primary key
ALTER TABLE three_month_rainfall
ADD COLUMN id SERIAL PRIMARY KEY;

-- Query all fields from the table
SELECT *
FROM firesummary;

-- Query all fields from the table
SELECT *
FROM summary_rainfall;

-- Query all fields from the table
SELECT *
FROM year_rainfall;

-- Query all fields from the table
SELECT *
FROM three_month_rainfall;