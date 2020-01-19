var svgWidth = 950;
var svgHeight = 500;
var samples = [];
var metaData = [];


// initialize the page
Init()


function DrawBargraph(sampleID)
{
  console.log("DrawBargraph: sample = ", sampleID);

  d3.json("Resources/samples.json").then((data) => {
    samples = data.samples;
  });

  var displayData = samples.filter(element => element.id == sampleID);
  var displayData = displayData[0];
  console.log("bargraph Data: ", displayData);

  // grab top 10 cultures from sample and store id in the sampleIds array
  var sampleIds = displayData.otu_ids.slice(0, 10);
  // grab the top 10 OTU
  var sampleOTU = displayData.otu_labels.slice(0, 10);
  // grab top 10 values for each culture and store it in the sampleValues array
  var sampleValues = displayData.sample_values;
  // create the y-axis variable names
  var yField = sampleIds.slice(0, 10).map(otuID => `OTU ${otuID} `).reverse();
  // Trace1 for the Data
  var trace1 = {
    x: sampleValues.slice(0, 10).reverse(),
    y: yField,
    type: "bar",
    text: sampleOTU.slice(0, 10).reverse(),
    orientation: "h"
  };
  // data
  var chartData = [trace1];
  // Apply the group bar mode to the layout
  var layout = {
    title: `Top Bacteria Cultures for Subject: ${sampleID}`,
  };
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);
}


function DrawBubbleChart(sampleID)
{
  console.log("DrawBubbleChart: sample = ", sampleID);

  d3.json("Resources/samples.json").then((data) => {

    var samples = data.samples;
    var resultArray = samples.filter(element => element.id == sampleID);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: {t : 0},
      hovermode: "closest",
      xaxis: { title: "OTU ID"},
      margin: {t : 30}
    }

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}


function ShowMetadata(sampleID)
{
  
  console.log("ShowMetadata: sample = ", sampleID);

  d3.json("Resources/samples.json").then((data) => {    
    
    var metaData = data.metadata;
    var displayData = metaData.filter(element => element.id == sampleID);
    var displayData = displayData[0];
    console.log("Metadata: ", displayData);

    var metaDataBody = d3.select("#sample-metadata");
    metaDataBody.html("");
    Object.entries(displayData).forEach(([key, value]) => {
      var demographicInfo = `${key.toUpperCase()}: ${value}`;
      metaDataBody.append("p").text(demographicInfo);
    });
  });
}

function DrawGauge(sampleID)
{
  console.log("ShowMetadata: sample = ", sampleID);

  d3.json("Resources/samples.json").then((data) => {

    var metaData = data.metadata;
    var displayData = metaData.filter(element => element.id == sampleID);
    var displayData = displayData[0];
    var frequency = displayData.wfreq;
    console.log("data: ", frequency);


    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: frequency,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
        gauge: {axis: { range: [0, 9]}, bar: { color : "SteelBlue "},},
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gauge", data, layout);  });
}


function optionChanged(newSampleID)
{
  console.log("Dropdown changed to: ", newSampleID);
  ShowMetadata(newSampleID);
  DrawBargraph(newSampleID);
  DrawBubbleChart(newSampleID);
  DrawGauge(newSampleID);
}


function Init()
{
  console.log("Initializing Screen");
  // Populate the dropdown box with all the IDs
  var selector = d3.select("#selDataset");

  d3.json("Resources/samples.json").then((data) => {    
    // grab the sample information and store it in samples array
    samples = data.samples;
    //metaData = data.metadata;

    // grab the sample id names and store them in sampleNames array
    var sampleNames = data.names;
  
    sampleNames.forEach((sampleID) => {
      selector 
        .append("option")
        .text(sampleID)
        .property("value", sampleID);
    });

    // Draw a bargraph
    DrawBargraph(sampleNames[0]);

    // Draw a bubble chart
    DrawBubbleChart(sampleNames[0]);

    // Draw the metadata
    ShowMetadata(sampleNames[0]);

    // Draw the gadge
    DrawGauge(sampleNames[0]);

  });
}