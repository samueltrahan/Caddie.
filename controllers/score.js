const Course = require('../models/course');
const {
    v4: uuidv4
} = require('uuid');



module.exports = {
    edit: editScore,
    addScore,
    update,
    delete: deleteScore
}

function editScore(req, res) {
    const detailsAndCourse = JSON.parse(req.body.detailsAndCourse)
    const details = detailsAndCourse.details;
    const courseId = detailsAndCourse.course;
    Course.findById(courseId, function (err, score) {
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
        course.scores.push({
            bestScore: req.body.bestScore,
            createdAt: new Date(),
            id: uuidv4(),
        });
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
    const detailsAndCourse = JSON.parse(req.body.detailsAndCourse)
    const details = detailsAndCourse.details;
    const courseId = detailsAndCourse.course;
    const scoreData = detailsAndCourse.score;
    Course.findById(courseId, function (err, course) {
        const updateCourseScores = course.scores.map((score) => {
            if (score.id === scoreData.id) {
                return {
                    ...score,
                    bestScore: JSON.parse(req.body.score),
                }
            }
            return score;
        })
        course.scores = updateCourseScores;
        course.save(function (err, score) {
            res.render('details', {
                courses: score,
                details,
                course: courseId,
                user: req.user
            })
        });
    })
}


function deleteScore(req, res) {
    Course.findByIdAndDelete(req.params.id, function (err, score) {
        res.redirect(`details/${req.params.score}`);
    })
}