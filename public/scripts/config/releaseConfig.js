import { ChartConfig } from './chartConfig.js';

/**
 * Configuration class for a line chart displaying the number of games released per year.
 */
export class ReleaseLineConfig extends ChartConfig {
    constructor(gamesData) {
        const grouped = ReleaseLineConfig.#groupByyear(gamesData);
        const sorted = Object.keys(grouped).sort((a, b) => a - b);

        super('line', {
            labels: sorted,
            datasets: [{
                label: 'Number of Games Released',
                data: sorted.map(year => grouped[year]),
                fill: true,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.4
            }]
        },
            {
            }
        )
    }

    /**
     * Groups games by their release year.
     * 
     * @param {object[]} gamesData - An array of game objects, each containing a releaseDate property.
     * @returns {object} - An object with years as keys and the count of games released in each year as values.
     */
    static #groupByyear(gamesData) {
        return gamesData.reduce((acc, game) => {
            const year = new Date(game.releaseDate).getFullYear();
            if (!isNaN(year)) {
                acc[year] = (acc[year] || 0) + 1;
            }
            return acc;
        }, {});
    }
}