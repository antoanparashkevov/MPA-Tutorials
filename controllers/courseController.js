const router = require('express').Router();

const parseError = require('../util/errorParser');
const { create } = require("../services/courseService");

router.get('/create', (req,res)=>{
    res.render('create',{
        title: 'Create Page'
    })
})

router.post('/create', async (req,res) => {
    const formData = req.body;
    console.log('formData (create) >>> ', formData);
    const course = {
        title: formData.title,
        description: formData.description,
        imgUrl: formData.imgUrl,
        duration: formData.duration,
        owner: req.user._id
    }
    
    try {
        await create(course);
        res.redirect('/');
    } catch ( error ) {
        const errors = parseError(error);

        res.render('create',{
            title: 'Create Page',
            errors,
            body: course
        })
    }
   
})

module.exports = router;