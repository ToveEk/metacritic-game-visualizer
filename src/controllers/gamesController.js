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
            const token = req.cookies.jwt;
            const { minYear, maxYear } = req.query;
            const releasesPerYear = await this.gamesService.getReleasesPerYear(undefined, token, parseInt(minYear), parseInt(maxYear));

            res.render('games', {
                games: [], // Pass an empty array for now, as the games data is not being fetched
                totalCount: 0, // Pass 0 for now, as the games data is not being fetched
                releasesPerYear
            });
        } catch (error) {
            req.session.flash = { type: 'error', message: 'Failed to load games: ' + error.message };
            res.redirect('/');
        }
    }

    async getFilteredGames(req, res) {
        try {
            const { platform, minYear, maxYear } = req.query;
            const token = req.cookies.jwt;
            const releasesPerYear = await this.gamesService.getReleasesPerYear(platform, token, parseInt(minYear), parseInt(maxYear));
            res.json(releasesPerYear);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch games: ' + error.message });
        }
    }
}