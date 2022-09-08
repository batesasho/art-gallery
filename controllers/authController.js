const router = require('express').Router();
const userService = require('../services/authService.js');
const {COOKIE_SESSION_NAME} = require('../configuration/constants.js');
const {isAuth, isGuest} = require("../middlewares/authMiddleware.js");


router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const {userName, password} = req.body;
    const user = await userService.login(userName, password);
    const token = await userService.createToken(user);
    res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true});
    res.redirect('/');
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const {password, repeatPassword, ...userData} = req.body;
    if (password !== repeatPassword) {
        return res.render('auth/register', {error: 'Passwords dont matches!!'});
    }
    try {
        const createdUser = await userService.create({password, ...userData});
        const token = await userService.createToken(createdUser);
        res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true});
        res.redirect('/login');
    } catch (err) {
        return res.render('auth/register', {error: "DB error"});

    }


});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_SESSION_NAME);
    res.redirect('/');
});


module.exports = router;
