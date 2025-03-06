const {Sequelize, sequelize} = require('../db');

// TODO - define the Song model
class Song extends Sequelize.Model {}

Song.init({
    title: Sequelize.STRING,
    year: Sequelize.INTEGER,
    length: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'song'
});

module.exports = {
    Song
};