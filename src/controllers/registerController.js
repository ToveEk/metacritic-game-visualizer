export class RegisterController {
    renderRegisterPage(req, res) {
        res.render('register')
    }

    registerUser(req, res) {
        // OAuth 2.0 registration logic goes here
    }
}