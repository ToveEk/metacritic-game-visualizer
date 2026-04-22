/**
 * ChartManager class to handle chart creation and updates using Chart.js
 */
export class ChartManager {
    constructor() {
        this.chart = null;
    }

    /**
     * Initializes the chart with the given configuration.
     * 
     * @param {object} config - The chart configuration object.
     */
    async initializeChart(config) {
        const ctx = document.getElementById('gamesChart').getContext('2d');

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: config.type,
            data: config.data,
            options: {
                responsive: true,
                ...config.options
            }
        });
    }

    /**
     * Updates the chart with new labels and data.
     * 
     * @param {string[]} labels - The new labels for the chart.
     * @param {number[]} data - The new data for the chart.
     * @returns {Promise<void>}
     */
    async updateChart(labels, data) {
        if (!this.chart) return;

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }

    /**
     * Adds a new dataset to the chart.
     * 
     * @param {string} label - The label for the new dataset.
     * @param {string[]} labels - The labels for the chart.
     * @param {number[]} data - The data for the new dataset.
     * @param {string} color - The color for the new dataset.
     * @returns {Promise<void>}
     */
    async addDataset(label, labels, data, color) {
        if (!this.chart) return;

        this.chart.data.datasets.push({
            label,
            data: this.chart.data.labels.map(year => {
                const index = labels.indexOf(year);
                return index !== -1 ? data[index] : 0;
            }),
            fill: true,
            backgroundColor: color,
            borderColor: color.replace('0.2', '1'),
            tension: 0.4
        });

        this.chart.update();
    }

    /**
     * Removes a dataset from the chart.
     * 
     * @param {string} label - The label of the dataset to remove.
     * @returns {Promise<void>}
     */
    removeDataset(label) {
        if (!this.chart) return;

        this.chart.data.datasets = this.chart.data.datasets.filter(dataset => dataset.label !== `Platform: ${label}`);
        this.chart.update();
    }
}