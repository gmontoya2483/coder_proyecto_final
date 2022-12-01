export const Authorization = (req, res, next) => {
    if(!req.isAuthenticated())
        return res.redirect('/login');

    next();
}
