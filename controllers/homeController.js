const { getAllByDate, getRecent } = require("../services/courseService");
const router = require('express').Router();

router.get('/', async(req, res) => {
    let view;
    let courses = [];
    
    if( req.user ) {
        view = 'user-home'
        courses = await getAllByDate();
    } else {
        view = 'guest-home'
        courses = await getRecent();
    }
    console.log('courses >>> ', courses)
    res.render(view, {
        title: 'Home page',
        courses
    })
})

module.exports = router;