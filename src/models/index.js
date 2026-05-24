const sequelize = require('../config/database');
const Bot = require('./Bot');
const ChabotNode = require('./ChatbotNode');
const Option = require('./Option');
const UserContext = require('./UserContext');

// Un ChatbotNode tiene muchas opciones
ChabotNode.hasMany(Option, { foreignKey: 'chatbotNodeId', as: 'opciones' });
Option.belongsTo(ChabotNode, { foreignKey: 'next_node_id', as: 'nextNode' });

Bot.hasMany(UserContext, { foreignKey: 'botId'});
UserContext.belongsTo(Bot, { foreignKey: 'botId' });

const db = {
    Bot,
    ChabotNode,
    Option,
    UserContext,
    sequelize
}

module.exports = db;