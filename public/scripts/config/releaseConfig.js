import { ChartConfig } from './chartConfig.js';

/**
 * Configuration class for a line chart displaying the number of games released per year.
 */
export class ReleaseLineConfig extends ChartConfig {
    constructor(gamesData) {
        const grouped = ReleaseLineConfig.#groupByyear(gamesData);
        const sorted = Object.keys(grouped)
            .map(Number)
            .sort((a, b) => a - b);

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
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                }
            }
        )
    }

    /**
     * Filters games by release year.
     *
     * @param {object[]} gamesData - An array of game objects.
     * @param {number} minYear - The minimum year to include.
     * @param {number} maxYear - The maximum year to include.
     * @returns {object} - An object with labels and data for the filtered games.
     */
    filterByYear(gamesData, minYear, maxYear) {
        const grouped = ReleaseLineConfig.#groupByyear(gamesData);
        const labels = Object.keys(grouped).sort((a, b) => a - b)
            .map(Number)
            .filter(year => {
                if (minYear && year < minYear) return false;
                if (maxYear && year > maxYear) return false;
                return true;
            })
            .sort((a, b) => a - b);

        return { labels, data: labels.map(year => grouped[year] || 0) };
    }

    /**
     * Filters games by platform.
     * 
     * @param {object[]} gamesData - An array of game objects.
     * @param {string} platform - The platform to filter by.
     * @returns {object} - An object with labels and data for the filtered games.
     */
    filterByPlatform(gamesData, platform) {
        const filteredGames = gamesData.filter(game => game.platforms.some(p => p.name.toLowerCase() === platform.toLowerCase()));
        return this.filterByYear(filteredGames);
    }

    /**
     * Groups games by their release year.
     * 
     * @param {object[]} gamesData - An array of game objects, each containing a releaseDate property.
     * @returns {object} - An object with years as keys and the count of games released in each year as values.
     */
    static #groupByyear(gamesData) {
        return gamesData.reduce((acc, game) => {
            const year = new Date(game.release_date).getFullYear();

            if (!isNaN(year)) {
                acc[year] = (acc[year] || 0) + 1;
            }

            return acc;
        }, {});
    }
}
