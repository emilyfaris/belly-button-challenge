// Reading the JSON data using D3
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
d3.json(url).then(data => {
    console.log('Data:', data);
    init(data);
});


// Initalizing the dashboard
function init(data) {
    // Populate dropdown menu
    const dropdown = d3.select("#selDataset");
    data.names.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
    });

    // Render initial visualizations
    const firstSample = data.names[0];
    updateVisualizations(firstSample, data);
}


// Updating visualizations based on drop down selection
function updateVisualizations(sampleId, data) {
    // Convert sampleId to a number for correct comparison
    let numSampleId = parseInt(sampleId);
    
    let selectedSample = data.samples.find(sample => sample.id === sampleId);
    let selectedMetadata = data.metadata.find(meta => meta.id === numSampleId);
    
    if (selectedSample && selectedMetadata) {
        updateBarChart(selectedSample);
        updateBubbleChart(selectedSample);
        displayMetadata(selectedMetadata);
        updateGaugeChart(selectedMetadata.wfreq); 
    } else {
        console.error('No data found for selected ID:', sampleId);
    }
}


d3.selectAll("#selDataset").on("change", function() {
    const newSampleId = d3.select(this).property("value");
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => updateVisualizations(newSampleId, data));
});


// Defining visualization functions
    // Bar Chart
    function updateBarChart(sample) {
        let trace1 = {
            x: sample.sample_values.slice(0, 10).reverse(),
            y: sample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: sample.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        data1 = [trace1]
    
        let layout1 = {
            title: 'Top 10 OTUs Found',
        };
    
        Plotly.newPlot('bar', data1, layout1);
    }

    // Bubble Chart
    function updateBubbleChart(sample) {
        let trace2 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            text: sample.otu_labels,
            mode: 'markers',
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids,
                colorscale: 'Earth'
            }
        };

        data2 = [trace2]
    
        let layout2 = {
            title: 'Bacteria Cultures Per Sample',
            showlegend: false,
            height: 600,
            width: 1200
        };
    
        Plotly.newPlot('bubble', data2, layout2);
    }

    // Metadata
    function displayMetadata(metadata) {
        const panel = d3.select("#sample-metadata");
        panel.html(""); // Clear existing metadata
        
        Object.entries(metadata).forEach(([key, value]) => {
            let displayValue = value;
            if (value === null || value === undefined) {
                displayValue = "Not available"; 
            }
            panel.append("h6").text(`${key.toUpperCase()}: ${displayValue}`);
        });
    }
    
    // Gauge Chart(wfreq)
    function updateGaugeChart(wfreq) {
        let trace3 = {
            domain: {x: [0, 1], y: [0, 1]},
            value: wfreq,
            title: {text: "Weekly Washing Frequency"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 9]}, // Setting the range of the gauge from 0 to 9
                steps: [
                    {range: [0, 1], color: "#e6ffe6"},
                    {range: [1, 2], color: "#ccffcc"},
                    {range: [2, 3], color: "#b3ffb3"},
                    {range: [3, 4], color: "#99ff99"},
                    {range: [4, 5], color: "#80ff80"},
                    {range: [5, 6], color: "#66ff66"},
                    {range: [6, 7], color: "#4dff4d"},
                    {range: [7, 8], color: "#33ff33"},
                    {range: [8, 9], color: "#1aff1a"}
                ],
            }
        };

        let data3 = [trace3]
    
        let layout3 = {
            width: 600,
            height: 450,
            margin: {t: 0, b: 0},
        };
    
        Plotly.newPlot('gauge', data3, layout3);
    }
    
     