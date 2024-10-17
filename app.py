import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from config import password
from flask import Flask, jsonify
from flask_cors import CORS

#################################################
# Database Setup (PostgreSQL)
#################################################

# Replace the connection details with your PostgreSQL details
engine = create_engine(f"postgresql://postgres:{password}@localhost/nuclear")

# Reflect the database tables
Base = automap_base()
Base.prepare(autoload_with=engine)

# Assuming your PostgreSQL table is called `nuclear_plants`, save a reference to it
NuclearPlant = Base.classes.nuclear_plants

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)  # Enable CORS for the entire Flask app

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/plant_names<br/>"
        f"/api/v1.0/plant_details"
    )

@app.route("/api/v1.0/plant_names")
def plant_names():
    # Create a session (link) from Python to the database
    session = Session(engine)

    """Return a list of all plant names"""
    # Query all plant names
    results = session.query(NuclearPlant.plant).all()

    session.close()

    # Convert list of tuples into a normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

@app.route("/api/v1.0/plant_details")
def plant_details():
    # Create a session (link) from Python to the database
    session = Session(engine)

    """Return a list of plant data including the name, latitude, and longitude of each plant"""
    # Query all plants
    results = session.query(NuclearPlant.plant, NuclearPlant.latitude, NuclearPlant.longitude).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_plants
    all_plants = []
    for plant, latitude, longitude in results:
        plant_dict = {}
        plant_dict["name"] = plant
        plant_dict["latitude"] = latitude
        plant_dict["longitude"] = longitude
        all_plants.append(plant_dict)

    return jsonify(all_plants)

if __name__ == '__main__':
    app.run(debug=True)