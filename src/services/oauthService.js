import dotenv from 'dotenv'
dotenv.config()

/**
 * Service for handling OAuth authentication with GitHub.
 */
export class OAuthService {
    constructor() {
        this.clientId = process.env.GITHUB_CLIENT_ID;
        this.clientSecret = process.env.GITHUB_CLIENT_SECRET;
        this.redirectUri = process.env.GITHUB_REDIRECT_URI;
    }

    /**
     * Generates the OAuth authorization URL.
     * 
     * @param {string} state - The state parameter for CSRF protection.
     * @returns {string} The OAuth authorization URL.
     */
    getAuthUrl(state) {
        return `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${state}`;
    }

    /**
     * Exchanges an authorization code for an access token.
     * 
     * @param {string} code - The authorization code.
     * @returns {Promise<string>} The access token.
     */
    async exchangeCodeForToken(code) {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: code,
                redirect_uri: this.redirectUri
            })
        });
        const data = await response.json();
        return data.access_token;

    }

    /**
     * Retrieves user data from GitHub.
     * 
     * @param {string} accessToken - The access token.
     * @returns {Promise<object>} The user data.
     */
    async getGitHubUserData(accessToken) {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const userData = await response.json();
        return userData;

    }

    /**
     * Retrieves an API token for the authenticated user.
     * 
     * @param {object} gitHubUser - The GitHub user object.
     * @returns {Promise<string>} The API token.
     */
    async getApiToken(gitHubUser) {
        const response = await fetch(`${process.env.API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        loginWithGitHub(gitHubId: "${gitHubUser.id}", email: "${gitHubUser.email}") {
                            token
                        }
                    }
                `
            })
        });
        const data = await response.json();
        return data.data.loginWithGitHub.token;
    }
}
