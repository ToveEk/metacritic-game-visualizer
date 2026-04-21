import { OAuthService } from '../services/oauthService.js';

/**
 * Controller for handling authentication-related actions.
 */
export class AuthenticationController {
    constructor() {
        this.oauthService = new OAuthService();
    }

    /**
     * Renders the login page with the GitHub authentication URL.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    renderLoginPage(req, res) {
        const state = this.#generateRandomState(req);
        res.render('login', {
            client_id: process.env.GITHUB_CLIENT_ID,
            state
        }
        )
    }

    /**
     * Generates the GitHub authentication URL and redirects the user to it.
     * 
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    getAuthenticationUrl(req, res) {
        const state = this.#generateRandomState(req);
        const authUrl = this.oauthService.getAuthUrl(state);
        res.redirect(authUrl);
    }

    /**
     * Handles the OAuth callback from GitHub.
     * 
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    async handleOAuthCallback(req, res) {
        try {
            this.#validateState(req);

            const { code } = req.query;

            if (!code) {
                throw new Error('Authorization code is missing');
            }

            const accessToken = await this.oauthService.exchangeCodeForToken(code);
            const gitHubUserData = await this.oauthService.getGitHubUserData(accessToken);
            const jwt = await this.oauthService.getApiToken(gitHubUserData);

            this.#setHttpOnlyCookie(res, jwt);

            res.redirect('/games');
        } catch (error) {
            req.session.flash = { type: 'error', message: 'Authentication failed: ' + error.message };
            res.redirect('/login');
        }
    }

    /**
     * Generates a random state parameter to prevent CSRF attacks.
     * 
     * @param {object} req - The request object.
     * @returns {string} The generated state parameter.
     */
    #generateRandomState(req) {
        const state = Math.random().toString(36).substring(2); // Generate a random state parameter to prevent CSRF attacks

        req.session.oauthState = state;
        return state;
    }

    /**
     * Sets an HTTP-only cookie for the JWT token.
     * @param {object} res - The response object.
     * @param {string} token - The JWT token.
     */
    #setHttpOnlyCookie(res, token) {
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
    }
    
    /**
     * Validates the state parameter to prevent CSRF attacks.
     * @param {object} req - The request object.
     */
    #validateState(req) {
        const { state } = req.query;
        if (state !== req.session.oauthState) {
            throw new Error('Invalid state parameter');
        }
        req.session.oauthState = null; // Clear the state after validation
    }
}