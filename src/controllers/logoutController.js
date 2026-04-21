export class LogoutController {
    logoutUser(req, res) {
        res.clearCookie('jwt')
        res.redirect('/')
    }
}