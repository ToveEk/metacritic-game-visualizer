export const requireAuth = (req, res, next) => {
    if (!req.cookies.jwt) {
        req.session.flash = { type: 'error', message: 'You must be logged in to access this page.' }
        return res.redirect('/login')
    }
    next()
}