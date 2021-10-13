var express = require('express');
var router = express.Router();
var { Marker, Topic, addTopicsFromRequest } = require('../database.js')

router.get("/all", function(req, res) {
  Marker.findAll({include: Topic})
      .then(markers => {
          res.status(200).send(JSON.stringify(markers));
      })
      .catch(err => {
          res.status(500).send(JSON.stringify(err));
      });
});;

router.put("/", function(req, res) {
    let marker = Marker.create({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        id: req.body.id,
    }).then(marker => {
        let topicIds = req.body.topicIds;
        if(topicIds && topicIds.length > 0) {
            addTopicsFromRequest(marker, topicIds).then(result => {
                res.status(200).send(JSON.stringify(marker));
            });
        } else {
            res.status(200).send(JSON.stringify(marker));
        }
    })
    .catch(err => {
        res.status(500).send(JSON.stringify(err));
    });

});

module.exports = router;
