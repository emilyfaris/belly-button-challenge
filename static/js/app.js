// Reading the JSON data using D3
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
d3.json(url).then(data => {
    console.log(data);
    init(data);
});


// Initalizing the dashboard


// Updating visualizations based on drop down selection
function updateBarChart(sample) {
    let sampleValues = sample.sample_values.slice(0, 10);
    let otuIds = sample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
    let otuLabels = sample.otu_labels.slice(0, 10);

    Plotly.restyle('bar', "x", [sampleValues]);
    Plotly.restyle('bar', "y", [otuIds]);
    Plotly.restyle('bar', "text", [otuLabels]);
}

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
     