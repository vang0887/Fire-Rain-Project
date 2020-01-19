// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([37.759596, -118.924962], 6);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);

//icon
var fireIcon = L.icon({
  iconUrl: '../Resources/iconfinder_flame_1055059.png',
  iconSize: [24]
});


// An array containing each city's name, location, and population
var counties = [{
  location: [39.2432, -123.1033],
  fire_name: "Mendocino Complex",
  county: "Mendocino",
  acres: "459,123",
  start_date: "July, 2018"
},
{
  location: [34.2770, -119.0453],
  fire_name: "Thomas",
  county: "Ventura",
  acres: "281,893",
  start_date: "	December, 2017"
},
{
  location: [33.0166, -116.6833],
  fire_name: "Cedar",
  county: "San Diego",
  acres: "273,246",
  start_date: "October, 2003"
},
{
  location: [40.5394, -120.712],
  fire_name: "Rush",
  county: "Lassen",
  acres: "271,911",
  start_date: "August, 2012"
},
{
  location: [37.85, -120.0833],
  fire_name: "Rim",
  county: "Tuolumne",
  acres: "257,314",
  start_date: "August, 2013"
},
{
  location: [34.7159, -119.7828],
  fire_name: "Zaca",
  county: "Santa Barbara",
  acres: "240,207",
  start_date: "July, 2007"
},
{
  location: [40.6543, -122.6236],
  fire_name: "Carr",
  county: "Shasta",
  acres: "229,651",
  start_date: "July, 2018"
},
{
  location: [34.5196, -119.3578],
  fire_name: "Matilija",
  county: "Ventura",
  acres: "220,000",
  start_date: "September, 1932"
},
{
  location: [32.7157, -117.1610],
  fire_name: "Witch",
  county: "San Diego",
  acres: "197,990",
  start_date: "October, 2007"
},
{
  location: [41.6149, -122.5028],
  fire_name: "Klamath Theater Complex",
  county: "Siskiyou",
  acres: "192,038",
  start_date: "June, 2008"
},
{
  location: [36.2704, -121.8079],
  fire_name: "Marble Cone",
  county: "Monterey",
  acres: "177,866",
  start_date: "July, 1977"
},
{
  location: [32.7826, -116.7091],
  fire_name: "Laguna",
  county: "San Diego",
  acres: "175,425",
  start_date: "September, 1970"
},
{
  location: [36.3136, -121.3542],
  fire_name: "Basin Complex",
  county: "Monterey",
  acres: "162,818",
  start_date: "June, 2008"
},
{
  location: [34.3705, -119.1391],
  fire_name: "Day",
  county: "Ventura",
  acres: "162,702",
  start_date: "September, 2006"
},
{
  location: [34.251, -118.195],
  fire_name: "Station",
  county: "Los Angeles",
  acres: "160,557",
  start_date: "August, 2009"
},
{
  location: [39.8102, -121.4372],
  fire_name: "Camp",
  county: "Butte",
  acres: "153,336",
  start_date: "November, 2018"
},
{
  location: [36.874, -118.905],
  fire_name: "Rough",
  county: "Fresno",
  acres: "151,623",
  start_date: "July, 2015"
},
{
  location: [36.23, -118.8],
  fire_name: "McNally",
  county: "Tulare",
  acres: "150,696",
  start_date: "July, 2002"
},
{
  location: [38.0297, -119.9741],
  fire_name: "Stanislaus Complex",
  county: "Tuolumne",
  acres: "145,980",
  start_date: "August, 1987"
},
{
  location: [40.58319, -123.16780],
  fire_name: "Big Bar Complex",
  county: "Trinity",
  acres: "140,948",
  start_date: "August, 1999"
}
];

counties.forEach((county) => {
  L.marker(county.location, {icon: fireIcon}).addTo(myMap)
  .bindPopup("<h1>" + county.fire_name + "</h1> <hr> <h3>Acres Burned: " + county.acres + "</h3>"
  + "<h3>Wildfire Date: " + county.start_date + "</h3>");
})


