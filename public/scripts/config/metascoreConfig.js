import { ChartConfig } from './chartConfig.js';

/**
 * Configuration class for a bar chart displaying the Metascore of games.
 */
export class MetascoreBarConfig extends ChartConfig {
    constructor(gamesData) {
        super('bar', {
            labels: gamesData.map(game => game.title),
            datasets: [{
                label: 'Metascore',
                data: gamesData.map(game => game.metascore),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
            {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        )
    }
}