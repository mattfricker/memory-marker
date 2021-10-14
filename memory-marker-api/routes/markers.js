const express = require('express');
const router = express.Router();
const { Marker, Topic } = require('../database/model');
const queryUtils = require('../database/queryUtils')

router.get("/all", function(req, res) {
    queryUtils.getAllMarkers()
      .then(markers => {
          res.status(200).send(JSON.stringify(markers));
      })
      .catch(err => {
          res.status(500).send(JSON.stringify(err));
      });
});;

router.get("/:id", function(req, res) {
    queryUtils.findMarkerById(req.params.id)
        .then(marker => {
            const status = marker ? 200 : 404;
            if(marker) {
                res.status(200).send(JSON.stringify(marker))
            } else {
                res.status(status).send(`A Marker with id ${req.params.id} does not exist.`);
            }
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/", function(req, res) {
    let {title, description, url } = req.body;
    queryUtils.createNewMarker(title, description, url)
        .then(marker => {
            let topicIds = req.body.topicIds;
            if(topicIds && topicIds.length > 0) {
                queryUtils.addTopicsFromRequest(marker, topicIds).then(result => {
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

router.delete("/:id", function(req, res) {
   queryUtils.deleteMarkerById(req.params.id)
        .then(marker => {
            const status = marker > 0 ? 200 : 404;
            res.status(status).send();
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
