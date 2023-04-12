const router = require('express').Router();

router.get('/create', (req,res)=>{
    res.render('create',{
        title: 'Create Page'
    })
})

router.post('/create', async(req,res)=>{
    res.render('create',{
        title: 'Create Page'
    })
})

module.exports = router;