const Course = require('../models/Course')

async function getAllByDate() {
    return Course.find({}).sort({createdAt: 1}).lean();//asc
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
    return Course.findByIdAndUpdate(courseId, data)
}

async function deleteById(courseId) {
    return Course.findByIdAndDelete(courseId);
}

module.exports = {
    getAllByDate,
    getRecent,
    getAll,
    getById,
    create,
    update,
    deleteById
}