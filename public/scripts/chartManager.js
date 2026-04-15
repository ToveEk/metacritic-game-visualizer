export class ChartManager {
    constructor() {
        this.chart = null;
    }

    async initializeChart() {
        const gamesData = window.gamesData || [];
        console.log('Initializing chart with data:', gamesData);

        const ctx = document.getElementById('gamesChart').getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: gamesData.map(game => game.title),
                datasets: [{
                    label: 'Metascore',
                    data: gamesData.map(game => game.metascore),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        console.log('Chart initialized successfully', this.chart);
    }
}