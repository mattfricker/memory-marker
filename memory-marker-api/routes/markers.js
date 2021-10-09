var express = require('express');
var router = express.Router();
var db = require('../database.js')

router.get("/all", function(req, res) {
  db.Marker.findAll()
      .then( markers => {
          res.status(200).send(JSON.stringify(markers));
      })
      .catch( err => {
          res.status(500).send(JSON.stringify(err));
      });
});;

router.put("/", function(req, res) {
    db.Marker.create({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        id: req.body.id
        })
        .then( marker => {
            res.status(200).send(JSON.stringify(marker));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
