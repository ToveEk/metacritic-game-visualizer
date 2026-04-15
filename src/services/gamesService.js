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

    /**
     * Fetches a game by its ID.
     * 
     * @param {number} id - The ID of the game to fetch.
     * @returns {Promise<Object>} A promise resolving to the fetched game.
     */
    async getGameById(id) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                    query Game($gameId: Int!) {
                        game(id: $gameId) {
                        id title metascore userscore description
                        developer publisher release_date
                        genres { name }
                        platforms { name }
                    }
                }
            `,
                    variables: {
                        gameId: id
                    }
                })
            });

            const data = await response.json();

            console.log('Fetched game:', data.data.game);
            return data.data.game;
        } catch (error) {
            throw new Error('Failed to fetch game: ' + error.message);
        }
    }
}