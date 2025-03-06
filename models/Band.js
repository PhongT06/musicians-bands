const {Sequelize, sequelize} = require('../db');

// TODO - define the Band model
class Band extends Sequelize.Model {}

Band.init({
    name: Sequelize.STRING,
    genre: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'band'
});

module.exports = {
    Band
};
