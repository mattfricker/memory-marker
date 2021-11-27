const db = require('./databaseFactory');
const Sequelize = require('sequelize');
const Marker = db.define('marker', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    }
});

const Topic = db.define('topic', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})

const MarkerTopic = db.define('marker_topic', {
    markerId: {
        type: Sequelize.INTEGER,
        references: {
            model: Marker,
            key: 'id'
        }
    },
    topicId: {
        type: Sequelize.INTEGER,
        references: {
            model: Topic,
            key: 'id'
        }
    }
},
{
    updatedAt: false
});

Marker.belongsToMany(Topic, {through: MarkerTopic});
Topic.belongsToMany(Marker, {through: MarkerTopic});

module.exports = {
    Marker: Marker,
    Topic: Topic,
    MarkerTopic: MarkerTopic
};