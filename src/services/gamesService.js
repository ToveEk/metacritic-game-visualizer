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
     * Fetches a list of games based on the provided criteria.
     * 
     * @param {Object} param - The criteria for fetching games.
     * @param {string} param.title - The title of the games to fetch.
     * @param {number} param.minMetascore - The minimum metascore of the games to fetch.
     * @param {number} param.limit - The maximum number of games to fetch.
     * @param {number} param.offset - The offset for pagination.
     * @returns {Promise<Array>} A promise resolving to the list of fetched games.
     */
    async getGames({ title, minMetascore, limit, offset }) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                    query Games($title: String, $minMetascore: Int, $limit: Int, $offset: Int) {
                        games(title: $title, minMetascore: $minMetascore, limit: $limit, offset: $offset) {
                            games { id title metascore userscore genres { name } platforms { name } developer publisher release_date description }
                            totalCount
                            hasNextPage
                        }
                    }
                `,
                    variables: {
                        title,
                        minMetascore,
                        limit,
                        offset
                    }
                })
            });

            const data = await response.json();

            return data.data.games;
        } catch (error) {
            throw new Error('Failed to fetch games: ' + error.message);
        }
    }

    async getReleasesPerYear(platform) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                    query ReleasesPerYear($platform: String) {
                        releasesPerYear(platform: $platform) {
                            year
                            release_count
                        }
                    }
                `,
                    variables: {
                        platform
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