import { OAuthService } from '../services/oauthService.js';

export class AuthenticationController {
    constructor() {
        this.oauthService = new OAuthService();
    }

    renderLoginPage(req, res) {
        const state = Math.random().toString(36).substring(2); // Generate a random state parameter to prevent CSRF attacks

        res.render('login', {
            client_id: process.env.GITHUB_CLIENT_ID,
            state
        }
        )
    }

    authenticateUser(req, res) {
        // OAuth 2.0 login logic goes here
        const authUrl = this.oauthService.getAuthUrl();
        res.redirect(authUrl);
    }

    async handleOAuthCallback(req, res) {
        const { code } = req.query;
        try {
            const accessToken = await this.oauthService.exchangeCodeForToken(code);
            const gitHubUserData = await this.oauthService.getGitHubUserData(accessToken);
            const jwt = await this.oauthService.getApiToken(gitHubUserData);
            
            console.log('code:', code);

            res.redirect('/');
        } catch (error) {
            console.error('Error during OAuth callback:', error);
            res.status(500).send('Authentication failed');
        }
    }
}