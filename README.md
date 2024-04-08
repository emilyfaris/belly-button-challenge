# belly-button-challenge

## Project Overview

The Belly Button Biodiversity Dashboard is an interactive web application designed to visualize the microbial species (also known as operational taxonomic units, or OTUs) found in human navels. This project utilizes D3.js and Plotly.js to read in a JSON dataset and dynamically update the visualizations based on user input.

### Features

- **Dropdown Menu**: Users can select individual IDs to view demographic information and microbial data associated with the chosen individual.
- **Bar Chart**: Displays the top 10 OTUs found in the selected individual.
- **Bubble Chart**: Showcases each sample, using `otu_ids` for the x values, `sample_values` for the y values and marker size, and `otu_ids` for the marker colors.
- **Gauge Chart**: Visualizes the weekly washing frequency of the individual through a gauge chart.
- **Demographic Information Panel**: Displays key demographic information about the selected individual.
