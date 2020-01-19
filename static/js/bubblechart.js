
d3.json("/wildfireTable").then(function(data){
    console.log(data);
    // var firename = [];
    // var fireacres = [];
    // for (var i = 0; i < data.length; i++){
    //     firename.append(data[i].firename);
    //     fireacres.append(data[i].acres);
    // }
    // // var firename = data.firename;
    // // var fireacres = data.acres;
    firename = data.map(d => d.firename);
    fireacres = data.map(d => d.acres);
    
    var trace1 = {
        x: firename,
        y: fireacres,
        text: firename,
        mode: 'markers',
        marker: {
            color: firename,
            size: fireacres
        }
        };
        
        var dt = [trace1];
        
        var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        xaxis: { title: "FIRE"}
        };
        
        Plotly.newPlot('bubble', dt, layout);
});
