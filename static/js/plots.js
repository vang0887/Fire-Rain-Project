var svgWidth = 950;
var svgHeight = 500;

//Show data on selected fire
function ShowMetadata(fireID)
{
  
  console.log("ShowMetadata: sample = ", fireID);

  d3.json("/wildfireTable").then((data) => {    
    
    var displayData = data.filter(element => element.firename == fireID);
    var result = displayData[0];
    console.log(data);

    var metaDataBody = d3.select("#sample-metadata");
    metaDataBody.html("");
    Object.entries(result).forEach(([key, value]) => {
      var fireInfo = `${key.toUpperCase()}: ${value}`;
      metaDataBody.append("h6").text(fireInfo);
    });
  });
}

ShowMetadata("Mendocino Complex");

function optionChanged(newfireID)
{
  console.log("Dropdown changed to: ", newfireID);
  ShowMetadata(newfireID);
  buildLine(newfireID);
}
//Build line graph of rainfall (in) vs dates
function buildLine(fireID){
  d3.json("/3monthsRain").then(function(data){
      console.log(data);

      var resultArr = data.filter(element => element.firename == fireID);

      console.log(resultArr);
  

      var readings_label  = resultArr.map(d => d.reading);
      var rainfalls = resultArr.map(d => d.rainfall);

      var trace1 = {
        x: readings_label,
        y: rainfalls,
        type: "line"
      };
      
      var data = [trace1];
      
      var layout = {
        title: "Daily Rainfall Three Months Prior to Fire",
        xaxis: { title: "Dates"},
        yaxis: { title: "Rainfall in Inches"}
      };
      
      Plotly.newPlot("linechart", data, layout);
  })
}

buildLine("Mendocino Complex");

//update dashboard when a different fire is selected
function Init(){
    console.log("Initializing Screen");
    // Populate the dropdown box with all the IDs
    var selector = d3.select("#selDataset");

    d3.json("/wildfireTable").then(function(data){    
    

      // grab the fire names and store them in fireNames array
        var fireNames = data.map(d => d.firename);
        console.log(fireNames)
      
        fireNames.forEach((fire) => {
            selector 
              .append("option")
              .text(fire)
              .property("value", fire);
        });
    });  
    
    ShowMetadata(fire);
    buildLine(fire);
}

// initialize the page
Init();
