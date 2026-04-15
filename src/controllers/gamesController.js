import { GamesService } from "../services/gamesService.js";

/**
 * Controller for handling game-related routes and rendering the games page.
 */
export class GamesController {
    constructor() {
        this.gamesService = new GamesService();
    }

    /**
     * Renders the games page.
     * 
     * @param {object} req - The request object containing query parameters for pagination.
     * @param {object} res - The response object.
     */
    async renderGamesPage(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const games = await this.gamesService.getGames({ limit, offset });

            res.render('games', {
                games: games.games,
                totalCount: games.totalCount,
                hasNextPage: games.hasNextPage,
                page
            });
        } catch (error) {
            throw new Error('Failed to fetch games: ' + error.message);
        }

    }
}