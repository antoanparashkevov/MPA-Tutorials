const { register, login, logout } = require("../services/authService");
const parseError = require('../util/errorParser');
const { isGuest } = require("../middlewares/guard");

const router = require('express').Router();

router.get('/register', isGuest(), (req,res) => {
    res.render('register', {
        title: 'Register Page'
    })
});

router.post('/register', isGuest(), async (req,res) => {
    const formData = req.body;
    console.log('formData (register) >>>', formData);
    try {
        
        if( formData.username === '' || formData.password === '' ) {
            throw new Error('All fields are required!');
        }
        
        if( formData.password !== formData.repass ) {
            throw new Error('Passwords don\'t match!');
        }
        
        const token = await register(formData.username, formData.password);
        
        res.cookie('token', token);
        res.redirect('/');//TODO see the assigment
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

router.post('/login', isGuest(), async (req, res) => {
    const formData = req.body;
    console.log('formData (login) >>> ', formData)
    try {
        
        if( formData.username === '' || formData.password === '' ) {
            throw new Error('All fields are required!')
        }
        
        const token = await login(formData.username, formData.password);
        res.cookie('token', token);
        res.redirect('/')//TODO see the assignment
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
    res.redirect('/')//TODO see the assignment
})

module.exports = router;