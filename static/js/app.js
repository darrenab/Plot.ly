

function buildMetadata(sample) {
  console.log("i'm in buildMetadata")
  d3.json(`/metadata/${sample}`).then(function(d)
    {console.log(Object.entries(d));
      
      var clear = d3.select('#sample-metadata');
      

clear.html('');

Object.entries(d).forEach(([key,value])=>{
  clear.append('h6').text(`${key}:${value}`);
});

// clear.selectAll('h6').data(Object.entries(d)).enter().append('h6')
// .text(function(d) {return `${d[0]}: ${d[1]}`;});
  
  })
  
    // Use d3 to select the panel with id of `#sample-metadata`
  
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    }

function buildCharts(sample) {
  console.log("i'm in buildCharts")
  d3.json(`/samples/${sample}`).then(function(d){
  // @TODO: Use `d3.json` to fetch the sample data for the plots
    
    var otu_ids = d.otu_ids
    var sample_values = d.sample_values
    var otu_labels= d.otu_labels
    
    var bTrace={
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      text: otu_labels,
      marker:{
        size:sample_values,
        color:otu_ids,
        text: otu_labels,
        colorscale: 'Earth'           
    }};
    var bData = [bTrace];
    
    var bLayout = {
      xaxis: {title: "ID"}

    }
    Plotly.newPlot('bubble',bData, bLayout);
    
        // @TODO: Build a Pie Chart
    var pData = [{
      values: sample_values.slice(0,10),
      labels: otu_ids.slice(0,10),
      hovertext:otu_ids.slice(0,10),
      hoverinfo: 'hovertext',
      type:'pie'
    }];
      
    var pLayout = {
      margin: {t:0, l:0}};
  
      Plotly.newPlot('pie',pData, pLayout);  
  
    
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  // )
})
}

function init() {
  console.log("I'm in init")
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
// this is only called on a change event
function optionChanged(newSample) {
  console.log("i'm in optionChanged")
  console.log(newSample)
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
