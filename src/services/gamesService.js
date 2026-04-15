import dotenv from 'dotenv';

dotenv.config()

export class GamesService {
    constructor() {
        this.apiUrl = process.env.API_URL;
    }

    async getGames({ title, minMetascore, limit, offset }) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query Games($title: String, $minMetascore: Int, $limit: Int, $offset: Int) {
                        games(title: $title, minMetascore: $minMetascore, limit: $limit, offset: $offset) {
                            games { id title metascore userscore genres { name } platforms { name } }
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

        console.log('Fetched games:', data.data.games);
        return data.data.games;
    }

    async getGameById(id) {
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
    }
}