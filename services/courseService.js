const Course = require('../models/Course')

async function getAllByDate(search) {
    const query = {}
    if( search ) {
        query.title = new RegExp(search, 'i');
    }
    
    return Course.find(query).sort({createdAt: 1}).lean();//asc
    
}

async function getRecent() {
    return Course.find({}).sort( {userCount: -1 }).limit(3).lean()//desc
}

async function getAll() {
    return Course.find({}).lean();
}

async function getById(id) {
    return Course.findById(id).lean();
}

async function create(data) {
    return Course.create(data)
}

async function update(courseId, data) {
    const course = await Course.findById(courseId);
    
    course.title = data.title;
    course.description = data.description;
    course.imgUrl = data.imgUrl;
    course.duration = data.duration;
    
    return course.save();
    
}

async function deleteById(courseId) {
    return Course.findByIdAndDelete(courseId);
}

async function enrollUser(courseId, userId) {
    const course = await Course.findById(courseId);
    course.userCount++;
    course.enrolledUsers.push(userId);
    
    return course.save();
}

module.exports = {
    getAllByDate,
    getRecent,
    getAll,
    getById,
    create,
    update,
    deleteById,
    enrollUser
}