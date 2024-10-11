# Cancer_Cartographers
Project 3 Data Visualization project


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
