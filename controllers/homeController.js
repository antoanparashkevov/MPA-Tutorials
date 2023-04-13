const { getAllByDate, getRecent } = require("../services/courseService");
const router = require('express').Router();

router.get('/', async(req, res) => {
    let view;
    let courses = [];
    
    if( req.user ) {
        view = 'user-home'
        courses = await getAllByDate(req.query.search);
    } else {
        view = 'guest-home'
        courses = await getRecent();
    }
    
    res.render(view, {
        title: 'Home page',
        courses,
        search: req.query.search
    })
})

module.exports = router;