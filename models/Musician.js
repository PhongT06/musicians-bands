const {Sequelize, sequelize} = require('../db');

// TODO - define the Musician model
class Musician extends Sequelize.Model {}
// let Musician;

Musician.init({
    name: Sequelize.STRING,
    instrument: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'musician'
});

module.exports = {
    Musician
};