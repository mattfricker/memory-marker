var express = require('express');
var router = express.Router();
var { Topic } = require('../database.js')

router.get("/all", function(req, res) {
  Topic.findAll()
      .then(topics => {
          res.status(200).send(JSON.stringify(topics));
      })
      .catch(err => {
          res.status(500).send(JSON.stringify(err));
      });
});;

router.put("/", function(req, res) {
    Topic.create({
        name: req.body.name,
        description: req.body.description,
        })
        .then(topic => {
            res.status(200).send(JSON.stringify(topic));
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
