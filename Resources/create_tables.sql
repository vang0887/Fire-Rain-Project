
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
  firename text
);

-- Create (THREE MONTH) rainfall table  
CREATE TABLE three_month_rainfall (
  reading date,
  rainfall float,
  county text,
  firename text
);


-- 1) Import summary_rainfall.csv 
-- 2) Add primary key
ALTER TABLE summary_rainfall
ADD COLUMN id SERIAL PRIMARY KEY;

-- 1) Import year_rainfall.csv
-- 2) Add primary key
ALTER TABLE year_rainfall
ADD COLUMN id SERIAL PRIMARY KEY;

-- 1) Import three_month_rainfall.csv 
-- 2) Add primary key
ALTER TABLE three_month_rainfall
ADD COLUMN id SERIAL PRIMARY KEY;


-- Query all fields from the table
SELECT *
FROM summary_rainfall;

-- Query all fields from the table
SELECT *
FROM year_rainfall;

-- Query all fields from the table
SELECT *
FROM three_month_rainfall;

-- run this in jupyter notebook WikiScrape first
SELECT *
FROM largestfires;