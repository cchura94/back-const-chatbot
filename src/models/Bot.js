const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

  const ChatbotNode = require('./ChatbotNode');


const Bot = sequelize.define(
  'Bot',
  {
    // Model attributes are defined here
    /*
    id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true,
    },
    */
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plataforma: {
        type: DataTypes.STRING,
        defaultValue: "cloud",
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Activo"
    },
    identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Guarda el phone_number_id de Cloud API o la instancia de evolution api"
    },
    prompt: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "Eres un asistente responde en menos de 30 palabras"
    },
    acces_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    webhook_verify_token: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  },
  {
    timestamps: true
  },
);

// asignar una configuración para el primer flujo
Bot.afterCreate(async (bot, options) => {
  await ChatbotNode.create({
    node_key: 'main',
    mensaje: `Hola, Bienvenido a ${bot.name}`,
    botId: bot.id,
  });
});

module.exports = Bot;