const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'mySecretCode';

async function register(username, password) {
    const existing = await User.findOne({username}).collation({
        locale: 'en',
        strength: 2
    })
    
    if( existing ) {
        throw new Error("Username is taken!")
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username,
        hashedPassword
    })
    
    return signToken(user);
}

async function login(username, password) {
    const user = await User.findOne({username}).collation({
        locale: 'en',
        strength: 2
    })
    
    if( !user ) {
        throw new Error('Incorrect username or password');
    }
    
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if( hasMatch === false ) {
        throw new Error('Incorrect username or password');
    }
    
    return signToken(user)
}

function signToken({ _id, username }) {
    const payload = {
        _id,
        username
    }
    
    return jwt.sign(payload, SECRET);//the token
    
}

//used in the session middleware to verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    login,
    register,
    verifyToken
}