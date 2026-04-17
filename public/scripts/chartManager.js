export class ChartManager {
    constructor() {
        this.chart = null;
    }

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

    async updateChart(labels, data) {
        if (!this.chart) return;

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }

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

    removeDataset(label) {
        if (!this.chart) return;

        this.chart.data.datasets = this.chart.data.datasets.filter(dataset => dataset.label !== `Platform: ${label}`);
        this.chart.update();
    }
}