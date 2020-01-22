var svgWidth = 950;
var svgHeight = 500;

//This works now
function ShowMetadata(fireID)
{
  
  console.log("ShowMetadata: sample = ", fireID);

  d3.json("/wildfireTable").then((data) => {    
    
    // var metaData = data.metadata;
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
  // DrawBargraph(newSampleID);
  // DrawBubbleChart(newSampleID);
  // DrawGauge(newSampleID);
}

function buildLine(fireID){
  d3.json("/3monthsRain").then(function(data){
      console.log(data);
      // var sample = data.samples;

      var resultArr = data.filter(element => element.firename == fireID);
      // var result = resultArr[0];
      console.log(resultArr);
      //top 10 otu

      var readings_label  = resultArr.map(d => d.reading);
      var rainfalls = resultArr.map(d => d.rainfall);

      var trace1 = {
        x: readings_label,
        y: rainfalls,
        type: "line"
      };
      
      var data = [trace1];
      
      var layout = {
        title: "Bar Chart",
        xaxis: { title: "Dates"},
        yaxis: { title: "Rainfall in inches"}
      };
      
      Plotly.newPlot("linechart", data, layout);
  })
}

buildLine("Mendocino Complex");

function Init(){
    console.log("Initializing Screen");
    // Populate the dropdown box with all the IDs
    var selector = d3.select("#selDataset");

    d3.json("/wildfireTable").then(function(data){    
    

      // grab the sample id names and store them in sampleNames array
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

    // // Draw the gadge
    // DrawGauge(sampleNames[0]);
}

// initialize the page
Init();
