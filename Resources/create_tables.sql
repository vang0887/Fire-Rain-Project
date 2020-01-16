-- Create fire_summary table
CREATE TABLE fire_summary (
  fire_name VARCHAR(30),
  county VARCHAR(30),
  acres int,
  hectares int,
  start_date date,
  structures int,
  deaths int
);

-- Create rainfall table 
CREATE TABLE rainfall (
  reading date,
  rainfall float,
  fire_name VARCHAR(30),
  county VARCHAR(30)
);

-- Query all fields from the table
SELECT *
FROM fire_summary;

-- Query all fields from the table
SELECT *
FROM rainfall;