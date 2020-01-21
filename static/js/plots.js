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
  // DrawBargraph(newSampleID);
  // DrawBubbleChart(newSampleID);
  // DrawGauge(newSampleID);
}

// function DrawGauge(sampleID)
// {
//   console.log("ShowMetadata: sample = ", sampleID);

//   d3.json("Resources/samples.json").then((data) => {

//     var metaData = data.metadata;
//     var displayData = metaData.filter(element => element.id == sampleID);
//     var displayData = displayData[0];
//     var frequency = displayData.wfreq;
//     console.log("data: ", frequency);


//     var data = [
//       {
//         domain: { x: [0, 1], y: [0, 1] },
//         value: frequency,
//         title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
//         gauge: {axis: { range: [0, 9]}, bar: { color : "SteelBlue "},},
//         type: "indicator",
//         mode: "gauge+number"
//       }
//     ];
    
//     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//     Plotly.newPlot("gauge", data, layout);  });
// }



function Init(){
    console.log("Initializing Screen");
    // Populate the dropdown box with all the IDs
    var selector = d3.select("#selDataset");

    d3.json("/wildfireTable").then(function(data){    
      // grab the sample information and store it in samples array
      // samples = data.samples;
      //metaData = data.metadata;

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
    // // Draw a bargraph
    // DrawBargraph(sampleNames[0]);

    // // Draw a bubble chart
    // DrawBubbleChart(sampleNames[0]);

    // // Draw the metadata
    ShowMetadata(fire);

    // // Draw the gadge
    // DrawGauge(sampleNames[0]);
}

// initialize the page
Init();
