const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || 'postgres',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });
const Marker = sequelize.define('Marker', {
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

const Topic = sequelize.define('Topic', {
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

const MarkerTopics = sequelize.define('MarkerTopics', {
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

Marker.belongsToMany(Topic, {through: MarkerTopics});
Topic.belongsToMany(Marker, {through: MarkerTopics});

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

module.exports = {
    sequelize: sequelize,
    Marker: Marker,
    Topic: Topic,
    addTopicsFromRequest: addTopicsFromRequest
};
