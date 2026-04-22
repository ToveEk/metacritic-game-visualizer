import dotenv from 'dotenv';

dotenv.config()
/**
 * The Games Service class is responsible for fetching game data from the API.
 */
export class GamesService {
    constructor() {
        this.apiUrl = process.env.API_URL;
    }

    /**
     * Gets the number of game releases per year, optionally filtered by platform.
     *
     * @param {string} platform - The platform to filter by.
     * @param {string} token - The authentication token.
     * @param {number} minYear - The minimum year to filter by.
     * @param {number} maxYear - The maximum year to filter by.
     * @returns {Promise<Array>} A promise resolving to the list of release counts per year.
     */
    async getReleasesPerYear(platform, token, minYear, maxYear) {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }


            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    query: `
                    query ReleasesPerYear($platform: String, $minYear: Int, $maxYear: Int) {
                        releasesPerYear(platform: $platform, minYear: $minYear, maxYear: $maxYear) {
                            year
                            release_count
                        }
                    }
                `,
                    variables: {
                        platform,
                        minYear,
                        maxYear
                    }
                })
            });
            const data = await response.json();

            return data.data.releasesPerYear;
        } catch (error) {
            throw new Error('Failed to fetch release data: ' + error.message);
        }
    }
}