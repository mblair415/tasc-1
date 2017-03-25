console.log("I am alive...");

var dataset = [];                        //Initialize empty array

$( document ).ready(function() {
    console.log( "... and ready for d3!" );
    $.get('http://localhost:3000/feedbacks')
    .then(function(success){
      success.forEach(function(elem) {
        dataset.push(Math.floor(elem.score+1));
      })
      viz(dataset);
    })
    .catch(function(error){
      console.error(error);
    })
    .always(function(andForever) {
      console.log("I am a turtlebot");
    })
    viz();
});


  var viz = function(dataset){
    d3.select("#graphBar").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style("height", function(d) {
          var barHeight = d * 20;  //Scale up by factor of 5
          return barHeight + "px";
    });

    var color = d3.scaleLinear()
    .domain([0, 1, 5])
    .range(["red", "white", "green"]);

    d3.select("#graphCircle").selectAll("div")
      .data(dataset)
      .enter()
      .append("svg")
      .attr("width", function(d) {
        var cirWidth = d * 10;  //Scale up by factor of 5
        return cirWidth;
      })
      .attr("height",  function(d) {
        var cirHeight = d * 10;  //Scale up by factor of 5
        return cirHeight;
      })
      .append("circle")
      .attr("cx",  function(d) {
        var cirCx = d/2 * 10;  //Divide d by 2 and scale up by factor of 5
        return cirCx;
      })
      .attr("cy",  function(d) {
        var cirCy = d/2 * 10;  //Divide d by 2 and scale up by factor of 5
        return cirCy;
      })
      .attr("r",  function(d) {
        var cirR = d/2 * 10;  //Divide d by 2 and scale up by factor of 5
        return cirR;
      })
      .style("fill",  function(d) {
        var cirColor = color(d);  //Define color by data
        console.log("color for",d, "is: ", cirColor);
        return cirColor;
      });
  }
