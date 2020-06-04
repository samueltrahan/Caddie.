const Course = require('../models/course');

module.exports = {
    create,
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