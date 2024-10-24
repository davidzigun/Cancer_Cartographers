# Cancer_Cartographers
Project 3 Data Visualization project

Cancer Incidence and Nuclear Power Plant Mapping

This project provides an interactive map of the United States that visualizes cancer incidence rates by county and the locations of nuclear power plants. The map allows users to explore patterns in cancer data, with a specific focus on breast cancer, and overlay it with the proximity of nuclear power plants.

Features

	•	Choropleth Map: Displays cancer incidence rates by county using a color gradient.
	•	Layer Toggles: Separate layers for general cancer data, breast cancer data, and nuclear power plant locations.
	•	Interactive Popups: Click on any county to view the average annual cancer count.
	•	Tile Layer: Uses OpenStreetMap tiles for the map background.

 API and Data

	•	Cancer Data API: The cancer data is fetched from a local API endpoint (/api/v1.0/cancer_data). Make sure your backend is running and accessible from the URL specified in the fetch() call.
	•	GeoJSON Data: The county boundaries are loaded from the gz_2010_us_050_00_5m.json file. Ensure this file is in the appropriate location relative to the code.

Usage

The map will automatically display the cancer incidence rates for all counties when loaded. You can switch between different layers:

	•	General Cancer Data
	•	Breast Cancer Data
	•	Nuclear Power Plant Locations

Clicking on a county will display a popup with detailed cancer incidence data for that region.

Code Explanation

The following is a high-level overview of how the map is implemented:

	•	Map Initialization: A Leaflet map object is created and centered on the U.S. with a zoom level of 5.
	•	Tile Layer: The OpenStreetMap tiles are used as the base map.
	•	Layer Groups: Three different layer groups are initialized for cancer data, breast cancer data, and nuclear power plants.
	•	Choropleth Creation:
	•	Cancer data is fetched from the backend.
	•	County names are normalized to ensure consistency when mapping cancer rates to GeoJSON features.
	•	A color scale is applied to the counties based on their cancer incidence rates.
	•	Interactive popups are generated to show detailed data on each county when clicked.

 Challenges and Learnings

	•	County Name Normalization: A helper function (normalizeName()) was implemented to standardize county names across different datasets.
	•	Data Integration: This project required integrating data from multiple sources and resolving discrepancies between datasets, such as mismatched county names.
	•	Leaflet.js: This library was used to create the interactive map and handle data visualization.

Future Improvements

	•	Add more cancer types or health-related data.
	•	Expand the API to include real-time data updates.
	•	Allow user interaction with filters to explore the data in greater depth.




PROPOSAL

Project 3 Proposal for Data Visualization

Project Title: Mapping of Cancer Incidence Rates by County, In Relation to Proximity of Nuclear Power Plants

Presented By: Cancer Cartographers
Team Members: Aya Fakhri, Kyle Goodwin, Aparajita Mondal, David Zigun

Project Overview:  
The goal of this project is to create an interactive map of the United States, allowing for toggling of the information by layers. The goal is to enable toggling of all cancer incidence rates by county, breast cancer incidence rates by county, and geographic locations of nuclear power plants. The aim is to create clear and understandable visualizations to explore the impact of proximity to nuclear power plants on cancer rates within nearby counties.


Project Objectives:
1. Data Visualization:
   - Visualize cancer rates by county in relation to nuclear power plants.
   - Allow users to explore trends through interactive visualizations.



 Key Features:
- Data Visualization:
  1. A dataset containing locations of US nuclear power plants, a dataset with age-adjusted annual incidence rates of all cancer types, a dataset with age-adjusted annual incidence rates of breast cancer.
  2. Three visualizations using Python’s Plotly library:
     - all cancer incidence rates by county
     - breast cancer incidence rates by county
     - geographic locations of nuclear power plants
  3. Interactive features (dropdowns or filters) for the USA   . 
The visualizations will clearly present the data in an easy-to-understand way.

Featured Datasets: 
Nuclear Power Plant location dataset (SQL): https://www.kaggle.com/datasets/marchman/geo-nuclear-data

Cancer incident rate site:
https://statecancerprofiles.cancer.gov/map/map.withimage.php?00&county&001&055&00&2&01&0&1&5&0#results 


 Technical Stack:
- Languages: Python
-  Libraries : seaborn
-  Visualization : Leaflet (for interactive charts)
-  Data Handling : Pandas
-  Database : SQLite (for data storage)
-  Backend : 

 Ethical Considerations:
We will ensure the data is presented fairly and without bias. All data sources and code references will be properly credited. The project will follow best practices to avoid any misuse of data or intellectual property.

 Timeline (2 Weeks):
-  Week 1 : 
   - Set up the dataset and clean the data.
   - Implement the ETL pipeline to load the data into SQLite.
   - Start building the basic visualizations.
  
-  Week 2 : 
   - Complete the visualizations and add user interactivity (dropdowns/filters).
   - Perform final testing and debugging.
