const Course = require('../models/course');


module.exports = {
    edit: editScore,
    addScore,
    update
}

function editScore(req, res) {
    const editScore = JSON.parse(req.body.editScore);
    const details = editScore.details;
    const courseId = editScore.course;
    Course.findById(req.params.id, function (err, score) {
        res.render('score/update', {
            courses: score,
            course: courseId,
            details,
            user: req.user
        })
    })
}

function addScore(req, res) {
    const detailsAndCourse = JSON.parse(req.body.detailsAndCourse)
    const details = detailsAndCourse.details;
    const courseId = detailsAndCourse.course;
    Course.findById(req.params.id, function (err, course) {
        course.score.push(req.body);
        course.save(function (err, score) {
            res.render('details', {
                courses: score,
                details,
                course: courseId,
                user: req.user
            })
        })
    })
}

function update(req, res) {
    Course.findByIdAndUpdate(req.params.id, req.body, function (err, score) {
        res.redirect('score/scores');
    })
}