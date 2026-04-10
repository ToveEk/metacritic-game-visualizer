export class LoginController {
    renderLoginPage(req, res) {
        res.render('login')
    }

    loginUser(req, res) {
        // OAuth 2.0 login logic goes here
    }
}