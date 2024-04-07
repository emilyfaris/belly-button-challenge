// This script assumes your JSON has a similar structure to your example, adjusted to fit the assignment requirements

// Read the JSON data using D3
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(init);

function init(data) {
    // Extract data for the first sample to display default plots
    let firstSample = data.samples[0];
    let sampleValues = firstSample.sample_values.slice(0, 10);
    let otuIds = firstSample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
    let otuLabels = firstSample.otu_labels.slice(0, 10);

    // Create the default bar plot
    let trace = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: "bar",
        orientation: "h"
    };

    let layout = {
        title: "Top 10 OTUs Found",
    };

    Plotly.newPlot('bar', [trace], layout);

    // Populate the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    data.names.forEach((name) => {
        dropdownMenu.append("option").text(name).property("value", name);
    });

    // On change to the dropdown, call getData()
    d3.selectAll("#selDataset").on("change", getData);

    // Function called by dropdown menu changes
    function getData() {
        let selectedId = dropdownMenu.property("value");
        let selectedSample = data.samples.find(sample => sample.id === selectedId);
        
        updateBarChart(selectedSample);
        // Add calls to update other charts here
    }
}

// Function to update the bar chart
function updateBarChart(sample) {
    let sampleValues = sample.sample_values.slice(0, 10);
    let otuIds = sample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
    let otuLabels = sample.otu_labels.slice(0, 10);

    Plotly.restyle('bar', "x", [sampleValues]);
    Plotly.restyle('bar', "y", [otuIds]);
    Plotly.restyle('bar', "text", [otuLabels]);
}
