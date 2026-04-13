export const requireAuth = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect('/login')
  }
  next()
}