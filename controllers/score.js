const Course = require('../models/course');


module.exports = {
    addScore
}


function addScore(req, res) {
    const detailsAndCourse = JSON.parse(req.body.detailsAndCourse)
    const details = detailsAndCourse.details;
    const courseId = detailsAndCourse.course;
    const reviews = detailsAndCourse.reviews;
    Course.findById(req.params.id, function (err, course) {
        course.score.push(req.body);
        course.save(function (err, score) {
            console.log(score);
            res.render('details', {
                courseScore: score,
                details,
                course: courseId,
                user: req.user
            })
        })
    })
}