const { Marker, Topic, MarkerTopic } = require('./model');
const Sequelize = require('sequelize');

async function getAllMarkers() {
    return await Marker.findAll({include: Topic});
}

async function findMarkerById(id) {
    return await Marker.findByPk(id, {include: Topic});
}

async function createNewMarker(title, description, url) {
    return await Marker.create({
        title,
        description,
        url
    })
}

async function deleteMarkerById(id) {
    return await Marker.destroy({
        where: {
            id
        }
    })
}

async function addTopicsFromRequest(marker, topicIds) {
    let topics = await Topic.findAll({
        where: {
            id: {
                [Sequelize.Op.or]: topicIds
            }
        }
    });
    return await marker.addTopics(topics);
}

async function getMarkerCountForTopicId(topicId) {
    return await MarkerTopic.count({
        where: {
            TopicId: topicId
        },
    })
}

module.exports = {
    getAllMarkers,
    findMarkerById,
    createNewMarker,
    deleteMarkerById,
    addTopicsFromRequest,
    getMarkerCountForTopicId
};