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
},
{
    freezeTableName: true,
    tableName: 'marker'
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
},
{
    freezeTableName: true,
    tableName: 'topic'
})

const MarkerTopic = db.define('MarkerTopic', {
    marker_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Marker,
            key: 'id'
        }
    },
    topic_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Topic,
            key: 'id'
        }
    }
},
{
    updatedAt: false,
    freezeTableName: true,
    tableName: 'marker_topic'
});

Marker.belongsToMany(Topic, {through: MarkerTopic});
Topic.belongsToMany(Marker, {through: MarkerTopic});

module.exports = {
    Marker: Marker,
    Topic: Topic,
    MarkerTopic: MarkerTopic
};