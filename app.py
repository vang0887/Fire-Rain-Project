from flask import Flask, jsonify, render_template, redirect
# import main
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


## Database Setup
database_name = 'CAWildfire_db'
username = 'postgres'
password = 'postgres'

engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/{database_name}')


# rds_connection_string = "ryanporrit:Helios007()@localhost:5432/CAWildfire_db"
# engine = create_engine(f'postgresql://{rds_connection_string}')

Base = automap_base()
Base.prepare(engine, reflect = True)

## Table Variable Creation
yearRainfall = Base.classes.year_rainfall

Rainfall = Base.classes.rainfall
WildFire = Base.classes.largestfires
#################################################
# Flask Setup
#################################################
# Create an instance of Flask
app = Flask(__name__)


# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    webpage = render_template("index.html")
    return webpage

@app.route("/json")
def json():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Return a list of all counties"""
    # Query data
    dates = session.query(yearRainfall.reading).all()
    rainfall = session.query(yearRainfall.rainfall).all()
    counties = session.query(yearRainfall.county).all()
    fireNames = session.query(yearRainfall.fire_name).all()
    session.close()

    # Convert list of tuples into normal list
    all_counties = list(np.ravel(counties))
    all_fireNames = list(np.ravel(fireNames))
    all_rainfall = list(np.ravel(rainfall))
    all_dates = list(np.ravel(dates))

    #data = [all_counties, all_rainfall, all_dates]
    year_rainfall = {"county":all_counties, "fire": all_fireNames,"rainfall":all_rainfall, "date":all_dates}

    #return jsonify("counties":all_counties, "rainfall":all_rainfall, "dates":all_dates)

    return year_rainfall

@app.route("/geomap")
def map():

    # Find one record of data from the mongo database
    #destination_data = mongo.db.collection.find_one()

    # Return template and data
    return render_template("geomap.html")

@app.route("/acres")
def acres():

    # Find one record of data from the mongo database
    #destination_data = mongo.db.collection.find_one()

    # Return template and data
    return render_template("acres.html")

@app.route("/wildfireTable")
def fire_name():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(WildFire.index ,WildFire.firename, WildFire.county, WildFire.acres, WildFire.hectares,WildFire.startdate, WildFire.structures, WildFire.deaths).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_fires = []
    for index, firename, county, acres, hectares,startdate, structures, deaths  in results:
        fire_dict = {}
        fire_dict["index"] = index
        fire_dict["firename"] = firename
        fire_dict["county"] = county
        fire_dict["acres"] = acres/9000
        fire_dict["hectares"] = hectares
        fire_dict["startdate"] = startdate
        fire_dict["structures"] = structures
        fire_dict["deaths"] = deaths
        all_fires.append(fire_dict)

    return jsonify(all_fires)

@app.route("/rainfallTable")
def firerain():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(Rainfall.reading ,Rainfall.rainfall, Rainfall.firename, Rainfall.county).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_rainfire = []
    for reading,rainfall,firename,county in results:
        rainfire_dict = {}
        rainfire_dict["reading"] = reading
        rainfire_dict["rainfall"] = rainfall
        rainfire_dict["firename"] = firename
        rainfire_dict["county"] = county
        all_rainfire.append(rainfire_dict)

    return jsonify(all_rainfire)

@app.route("/table")
def table():
    webpage = render_template("table.html")
    return webpage

@app.route("/leaflet")
def leafletmap():
    webpage = render_template("leaflet.html")
    return webpage

@app.route("/scatter")
def scatter():
    webpage = render_template("scatter.html")
    return webpage

@app.route("/bubble")
def bubble():
    webpage = render_template("bubble.html")
    return webpage
@app.route("/facts")
def facts():
    webpage = render_template("facts.html")
    return webpage

if __name__ == "__main__":
    app.run(debug=True)