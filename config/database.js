var Sequelize = require('sequelize');
var dotenv = require('dotenv');
dotenv.loa
var seq = new Sequelize('chatkonim', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
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
        type: Sequelize.STRING,
        allowNull: true
    },
    first_name: Sequelize.STRING,
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    latitude: {
        type: Sequelize.FLOAT(12, 18),
        allowNull: true
    },
    longitude: {
        type: Sequelize.FLOAT(12, 18),
        allowNull: true
    },
    is_connected: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    connected_to: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    },
    indexes: [
        {
            name: 'is_conncted_index',
            method: 'BTREE',
            fields: ['is_connected', {attribute: 'is_connected', collate: 'en_US', order: 'DESC'}]
        },
        {
            name: 'tid_index',
            method: 'BTREE',
            fields: ['tid', {attribute: 'tid', collate: 'en_US', order: 'DESC'}]
        }
    ]
});
var Message = seq.define('messages', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        priamryKey: true,
        autoIncrement: true
    },
    from_target: Sequelize.BIGINT.UNSIGNED,
    to_target: Sequelize.BIGINT.UNSIGNED,
    message: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})

seq.sync().then(function () {
    console.log("bot >> database >> synced successfully");
}).catch(function (err) {
    console.log("bot >> database >> there is an error : ", err);
});

module.exports = {connection: seq, Target: Target, Message: Message}