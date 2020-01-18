from flask import Flask, render_template, redirect

# from flask_pymongo import PyMongo
# import main
import numpy as np
import pandas as pd
import sqlalchemy

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify



## Database Setup
database_name = 'CAWildfire_db'
username = 'postgres'
password = 'postgres'

engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/{database_name}')

Base = automap_base()

Base.prepare(engine, reflect = True)

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


@app.route("/api/v1.0/fire")
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
        fire_dict["acres"] = acres
        fire_dict["hectares"] = hectares
        fire_dict["startdate"] = startdate
        fire_dict["structures"] = structures
        fire_dict["deaths"] = deaths
        all_fires.append(fire_dict)

    return jsonify(all_fires)

@app.route("/api/v1.0/rainfire")
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

# @app.route("/api/v1.0/shirley")
# def scrape():
#     # caliFires = mongo.db.caliFires
#     # # caliData = main.scrape()
#     # # print(caliData.camp_headline)
#     # mongo.db.collection.update({}, caliData, upsert=True)
#     webpage = render_template("table.html")
    # return webpage
if __name__ == "__main__":
    app.run(debug=True)
