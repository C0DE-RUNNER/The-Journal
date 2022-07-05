const express = require('express')
const passport = require('passport');
const router = express.Router()

// Auth with goolge
// route -  GET/auth/google

router.get('/auth/google', passport.authenticate('google',{ scope: ['profile']}))

// google auth callback
// route -  GET /auth/google/callback

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
 (req,res)=> {
    res.redirect('/dashboard');
})


// logout user
// route -  /auth/logout
router.get('/auth/logout', (req,res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router
