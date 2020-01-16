from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import main

#################################################
# Flask Setup
#################################################
# Create an instance of Flask
app = Flask(__name__)

#################################################
# PyMongo Connection Setup
#################################################
# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/WikiScrape")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    caliFires = mongo.db.collection.find_one()

    print(caliFires)
    # Return template and data
<<<<<<< Updated upstream
    return render_template("index.html", caliFires=caliFires)
=======
    webpage = render_template("scrape.html", caliFires=caliFires)
    return webpage
>>>>>>> Stashed changes


# Route that will trigger the scrape function
# @app.route("/scrape")
# def scrape():
#     caliFires = mongo.db.caliFires
#     caliData = main.scrape()
#     mongo.db.collection.update({}, caliData, upsert=True)
#     return redirect("/")

@app.route("/table")
def scrape():
<<<<<<< Updated upstream
    caliFires1 = mongo.db.califires
    caliData = main.scrape_all()
    mongo.db.collection.update({}, caliData, upsert=True)
    return redirect("/")
=======
    caliFires = mongo.db.caliFires
    # caliData = main.scrape()
    # print(caliData.camp_headline)
    mongo.db.collection.update({}, caliData, upsert=True)
    webpage = render_template("table.html", caliFires=caliFires)
    return webpage
>>>>>>> Stashed changes

if __name__ == "__main__":
    app.run(debug=True)
