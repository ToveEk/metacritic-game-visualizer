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
}