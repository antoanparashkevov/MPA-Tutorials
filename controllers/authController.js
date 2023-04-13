const { register, login, logout } = require("../services/authService");
const parseError = require('../util/errorParser');
const { isGuest } = require("../middlewares/guard");
const { body, validationResult } = require("express-validator");

const router = require('express').Router();

router.get('/register', isGuest(), (req,res) => {
    res.render('register', {
        title: 'Register Page'
    })
});

router.post('/register', 
    isGuest(),
    body('username')
        .isLength({min: 5})
        .withMessage('Username must be at least 5 characters long!')
        .isAlphanumeric()
        .withMessage('Username must contain only english letters or digits!'),
    body('password')
        .isLength({min: 5})
        .withMessage('Password must be at least 5 characters long!')
        .isAlphanumeric()
        .withMessage('Password must container only english letters or digits!'),
    async (req,res) => {
    const formData = req.body;
    
    try {
        const { errors } = validationResult(req);
        
        if( errors.length > 0 ) {
            throw errors
        }
        
        if( formData.password !== formData.repass ) {
            throw new Error('Passwords don\'t match!');
        }
        
        const token = await register(formData.username, formData.password);
        
        res.cookie('token', token);
        res.redirect('/');
    } catch ( error ) {
        const errors = parseError(error);
        
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: formData.username
            }
        })
    }
    
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login page'
    })
})

router.post('/login', 
    isGuest(),
    body('username')
        .isLength({min: 5})
        .withMessage('Username must be at least 5 characters long!')
        .isAlphanumeric()
        .withMessage('Username must contain only english letters or digits!'),
    body('password')
        .isLength({min: 5})
        .withMessage('Password must be at least 5 characters long!')
        .isAlphanumeric()
        .withMessage('Password must container only english letters or digits!'),
    async (req, res) => {
    const formData = req.body;

    try {
        const { errors } = validationResult(req);
        
        if( errors.length > 0 ) {
            throw errors;
        }
        
        const token = await login(formData.username, formData.password);
        res.cookie('token', token);
        res.redirect('/')
    } catch ( error ) {
        const errors = parseError(error);
        
        res.render('login', {
            title: 'Login page',
            errors,
            body: {
                username: formData.username
            }
        })
    }
})

router.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/')
})

module.exports = router;