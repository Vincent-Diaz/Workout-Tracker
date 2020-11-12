let DB = require("../models/workoutModel");
// require("../seeders/seed");

module.exports = function (app) {
    // DB.find({})
    // .then(res => {
    //     console.log(res);
    //     require("../seeders/seed");
    // })

    app.get("/api/workouts", (req, res) => {
        DB.find({})
        .populate("exercises")
        .populate("totalDuration")
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    });

    app.post("/api/workouts", ({body}, res) => {
        DB.create(body)
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.send(err);
        })
    });

    app.put("/api/workouts/:id", (req, res) => {
        DB.findOneAndUpdate(
            { _id: req.params.id}, 
            {$push: {exercises: req.body}},
            {new: true})
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.send(err);
        })
    });

    app.get("/api/workouts/range", (req, res) => {
        DB.find({})
        .then(workoutDB => {
            res.json(workoutDB)
        })
        .catch(err => {
            res.send(err);
        })
    });
};