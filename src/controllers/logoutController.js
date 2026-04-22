/**
 * Controller for handling user logout functionality.
 */
export class LogoutController {
    /**
     * Logs out the user by clearing their session and JWT cookie.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    logoutUser(req, res) {
        res.clearCookie('jwt')
        req.session.destroy();
        res.redirect('/')
    }
}