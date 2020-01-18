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

engine = create_engine(f'postgressql://{username}:{password}@localhost:5432/{database_name}')

Base = automap_base()

Base.prepare(engine, reflect = True)

# Rainfall = Base.classes.rainfall
WildFire = Base.classes.firesummary
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


@app.route("/api/v1.0/rain")
def fire_name():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(WildFire.fire_name, WildFire.county, WildFire.acres, WildFire.hectares, WildFire.structures, WildFire.deaths).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_fires = []
    for fire_name, county, acres, hectares, structures, deaths  in results:
        fire_dict = {}
        all_fires["fire_name"] = fire_name
        all_fires["county"] = county
        all_fires["acres"] = acres
        all_fires["hectares"] = hectares
        # all_fires["start-date"] = start-date
        all_fires["structures"] = structures
        all_fires["deaths"] = deaths
        all_fires.append(fire_dict)

    return jsonify(all_fires)

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
    # caliFires = mongo.db.caliFires
    # # caliData = main.scrape()
    # # print(caliData.camp_headline)
    # mongo.db.collection.update({}, caliData, upsert=True)
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
