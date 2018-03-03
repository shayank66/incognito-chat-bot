var Sequelize = require('sequelize');
var dotenv = require('dotenv');
dotenv.load();


var seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    },
    define: {
        charset: 'utf8mb4',
        dialectOptions: {
            collate: 'utf8mb4_general_ci'
        },
        timestamps: true
    }
});
var Target = seq.define('targets', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    tid: Sequelize.INTEGER.UNSIGNED,
    username: {
        type: Sequelize.STRING
    },
    first_name: {type: Sequelize.STRING, allowNull: false},
    last_name: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    latitude: {
        type: Sequelize.FLOAT(18, 12)
    },
    longitude: {
        type: Sequelize.FLOAT(18, 12)
    },
    is_connected: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    connected_to: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    }
}, {
    indexes: [
        {
            name: 'is_conncted_index',
            method: 'BTREE',
            fields: ['is_connected']
        },
        {
            name: 'tid_index',
            method: 'BTREE',
            fields: ['tid']
        }
    ]
});
var Message = seq.define('messages', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    from_target: Sequelize.BIGINT.UNSIGNED,
    to_target: Sequelize.BIGINT.UNSIGNED,
    message: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

seq.sync().then(function () {
    console.log("bot >> database >> synced successfully");
}).catch(function (err) {
    console.log("bot >> database >> there is an error : ", err);
});

module.exports = {connection: seq, Target: Target, Message: Message};