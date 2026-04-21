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
            const games = await this.gamesService.getGames({});
            const releasesPerYear = await this.gamesService.getReleasesPerYear();

            res.render('games', {
                games: games.games,
                totalCount: games.totalCount,
                releasesPerYear
            });
        } catch (error) {
            req.session.flash = { type: 'error', message: 'Failed to load games: ' + error.message };
            res.redirect('/');
        }
    }
}