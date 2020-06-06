const Course = require('../models/course');

module.exports = {
    create,
    addScore,
}


function create(req, res) {
    const detailsAndCourse = JSON.parse(req.body.detailsAndCourse)
    const details = detailsAndCourse.details;
    const courseId = detailsAndCourse.course;
    Course.findById(req.params.id, function (err, course) {
        course.reviews.push(req.body);
        course.save(function (err, reviews) {
            res.render('details', {
                courses: reviews,
                details,
                course: courseId,
                user: req.user
            })
        })
    })

}

function addScore(req, res) {
    const detailsAndCourse = JSON.parse(req.body.detailsAndCourse)
    const details = detailsAndCourse.details;
    const courseId = detailsAndCourse.course;
    Course.findById(req.params.id, function(err, course) {
        course.save(function(err, score) {
            console.log(score);
            res.render('details', {
                bestScore: score,
                details,
                course: courseId,
                user: req.user
            })
        })
    })
}