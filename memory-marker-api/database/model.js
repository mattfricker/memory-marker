const db = require('./databaseFactory');
const Sequelize = require('sequelize');
const Marker = db.define('Marker', {
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

const Topic = db.define('Topic', {
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

const MarkerTopic = db.define('MarkerTopic', {
    MarkerId: {
        type: Sequelize.INTEGER,
        references: {
            model: Marker,
            key: 'id'
        }
    },
    TopicId: {
        type: Sequelize.INTEGER,
        references: {
            model: Topic,
            key: 'id'
        }
    }
});

Marker.belongsToMany(Topic, {through: MarkerTopic});
Topic.belongsToMany(Marker, {through: MarkerTopic});

module.exports = {
    Marker: Marker,
    Topic: Topic,
    MarkerTopic: MarkerTopic
};