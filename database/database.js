const Sequelize = require('sequelize')

const connection = new Sequelize('apigames', 'root','123', {
    host: '172.17.0.2',
    port:'3306',
    dialect:'mariadb'
})

module.exports = connection;