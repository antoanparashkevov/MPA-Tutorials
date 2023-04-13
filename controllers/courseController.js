const router = require('express').Router();

const parseError = require('../util/errorParser');
const { create, getById, deleteById, update } = require("../services/courseService");

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

router.get('/:id/details', async (req, res) => {
    try {
        const course = await getById(req.params.id);
        
        if( course.owner.toString() === req.user._id ) {
            course.isOwner = true;
        }
        
        res.render('details', {
            title: course.title,
            course
        })
    } catch ( error ) {
        const errors = parseError(error)

        res.render('details', {
            title: 'Details page',
            errors
        })
    }
})

router.get('/:id/delete', async (req, res) => {
    try {
        const course = await getById(req.params.id);
        
        if( course.owner.toString() !== req.user._id) {
            return res.redirect('/auth/login')
        }
        
        await deleteById(req.params.id);
        res.redirect('/')
     
        
    } catch ( error ) {
        const errors = parseError(error)

        res.render('details', {
            title: 'Details page',
            errors
        })
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const course = await getById(req.params.id);
        
        if( course.owner.toString() !== req.user._id) {
            return res.redirect('/auth/login')
        }
        
        res.render('edit', {
            title: 'Details page',
            course
        })
     
    } catch ( error ) {
        const errors = parseError(error)

        res.render('details', {
            title: 'Details page',
            errors
        })
    }
})

router.post('/:id/edit', async (req, res) => {
    const formData = req.body;
    console.log('formData (edit) >>> ', formData);
    
    try {
        const course = await getById(req.params.id);
        
        if( course.owner.toString() !== req.user._id) {
            return res.redirect('/auth/login')
        }
       
        await update(req.params.id, formData);
        res.redirect('/course/' + req.params.id + '/details')
    } catch ( error ) {
        const errors = parseError(error)

        res.render('edit', {
            title: 'Details page',
            errors,
            course: { 
                ...formData,
                _id: req.params.id
            }
        })
    }
})

module.exports = router;