import dotenv from 'dotenv'
dotenv.config()

export class OAuthService {
    constructor() {
        this.clientId = process.env.GITHUB_CLIENT_ID;
        this.clientSecret = process.env.GITHUB_CLIENT_SECRET;
        this.redirectUri = process.env.GITHUB_REDIRECT_URI;
    }

    getAuthUrl() {
        const state = Math.random().toString(36).substring(2); // Generate a random state parameter to prevent CSRF attacks
        return `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${state}`;
    }

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

    async getGitHubUserData(accessToken) {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const userData = await response.json();
        return userData;

    }

    async getApiToken(gitHubUser) {
        const response = await fetch(`${process.env.WT1_API_URL}`, {
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
