d3.json("/wildfireTable").then(function(data){
    console.log(data);
    firenames = data.map(d => d.firename);
    fireacres = data.map(d => d.acres);

    dataset = {
        "children": [{"Name":firenames[0],"Acres":fireacres[0]},
            {"Name":firenames[1],"Acres":fireacres[1]},
            {"Name":firenames[2],"Acres":fireacres[2]},
            {"Name":firenames[3],"Acres":fireacres[3]},
            {"Name":firenames[4],"Acres":fireacres[4]},
            {"Name":firenames[5],"Acres":fireacres[5]},
            {"Name":firenames[6],"Acres":fireacres[6]},
            {"Name":firenames[7],"Acres":fireacres[7]},
            {"Name":firenames[8],"Acres":fireacres[8]},
            {"Name":firenames[9],"Acres":fireacres[9]},
            {"Name":firenames[10],"Acres":fireacres[10]},
            {"Name":firenames[11],"Acres":fireacres[11]},
            {"Name":firenames[12],"Acres":fireacres[12]},
            {"Name":firenames[13],"Acres":fireacres[13]},
            {"Name":firenames[14],"Acres":fireacres[14]}
        ]};

    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset) //descendants and children
        .sum(function(d) { return d.Acres; });

    var node = svg.selectAll(".node") //*
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.Name + ": " + d.Acres;
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "black");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Acres;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "black");

    d3.select(self.frameElement)
        .style("height", diameter + "px");
});