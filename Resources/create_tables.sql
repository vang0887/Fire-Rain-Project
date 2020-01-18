-- Create fire_summary table
-- use Largest CA Wildfires from Resources folder
CREATE TABLE firesummary (
  fire_name VARCHAR(30),
  county VARCHAR(30),
  acres int,
  hectares int,
  start_date date,
  structures int,
  deaths int
);


-- Create rainfall table 
-- use Combined CA Wildfires from Resources folder
CREATE TABLE rainfall (
  reading date,
  rainfall float,
  fire_name VARCHAR(30),
  county VARCHAR(30)
);

-- Query all fields from the table
SELECT *
FROM firesummary;

-- Query all fields from the table
SELECT *
FROM rainfall;