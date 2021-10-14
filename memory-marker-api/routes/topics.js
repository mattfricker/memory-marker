const express = require('express');
const router = express.Router();
const { Topic } = require('../database/model');
const queryUtils = require('../database/queryUtils')

router.get("/all", function(req, res) {
  Topic.findAll()
      .then(topics => {
          res.status(200).send(JSON.stringify(topics));
      })
      .catch(err => {
          res.status(500).send(JSON.stringify(err));
      });
});;

router.get("/:id", function(req, res) {
    Topic.findByPk(req.params.id)
        .then(topic => {
            const status = topic ? 200 : 404;
            if(topic) {
                res.status(200).send(JSON.stringify(topic))
            } else {
                res.status(status).send(`A Topic with id ${req.params.id} does not exist.`);
            }
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
})

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

router.delete("/:id", async function(req, res) {
    let markerCountForTopic = await queryUtils.getMarkerCountForTopicId(req.params.id);
    if(markerCountForTopic > 0) {
        return res.status(409).send(JSON.stringify(`Cannot delete Topic that is being used by ${markerCountForTopic} Markers`))
    } else {
        Topic.destroy({
            where: {
                id: req.params.id
            }
        }).then(topic => {
                const status = topic > 0 ? 200 : 404;
                res.status(status).send();
            })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
    }
});

module.exports = router;
