const { Topic, MarkerTopic } = require('./model');
const Sequelize = require('sequelize');

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
    addTopicsFromRequest: addTopicsFromRequest,
    getMarkerCountForTopicId: getMarkerCountForTopicId
};