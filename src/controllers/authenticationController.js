import { OAuthService } from '../services/oauthService.js';

export class AuthenticationController {
    constructor() {
        this.oauthService = new OAuthService();
    }

    renderLoginPage(req, res) {
        const state = this.#generateRandomState(req);
        res.render('login', {
            client_id: process.env.GITHUB_CLIENT_ID,
            state
        }
        )
    }

    getAuthenticationUrl(req, res) {
        const state = this.#generateRandomState(req);
        const authUrl = this.oauthService.getAuthUrl(state);
        res.redirect(authUrl);
    }

    async handleOAuthCallback(req, res) {
        try {
            this.#validateState(req);

            const { code } = req.query;
            const accessToken = await this.oauthService.exchangeCodeForToken(code);
            const gitHubUserData = await this.oauthService.getGitHubUserData(accessToken);
            const jwt = await this.oauthService.getApiToken(gitHubUserData);

            this.#setHttpOnlyCookie(res, jwt);

            res.redirect('/games');
        } catch (error) {
            console.error('Error during OAuth callback:', error);
            res.status(500).send('Authentication failed');
        }
    }

    #generateRandomState(req) {
        const state = Math.random().toString(36).substring(2); // Generate a random state parameter to prevent CSRF attacks

        req.session.oauthState = state;
        return state;
    }

    #setHttpOnlyCookie(res, token) {
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
    }

    #validateState(req) {
        const { state } = req.query;
        if (state !== req.session.oauthState) {
            throw new Error('Invalid state parameter');
        }
        req.session.oauthState = null; // Clear the state after validation
    }
}