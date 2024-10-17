CREATE TABLE nuclear_plants (
	FID INT PRIMARY KEY, 
	Region VARCHAR(255),
	Country VARCHAR(255),
	Plant VARCHAR(255),
	NumReactor VARCHAR(255),
	Latitude DECIMAL,
	Longitude DECIMAL
);
SELECT * FROM nuclear_plants;