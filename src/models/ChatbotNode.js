const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChabotNode = sequelize.define(
  'ChabotNode',
  {
    // Model attributes are defined here
    /*id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true,
    },*/
    node_key: { // main, servicios, agendar_cita, etc
      type: DataTypes.STRING,
      allowNull: false,
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tipo_mensaje: {
        type: DataTypes.STRING,
        defaultValue: "texto"
    },
    botId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Bots', // nombre de la tabla a la que hace referencia
          key: 'id', // columna de la tabla referenciada
        }
    },
  },
  {
    timestamps: true
  },
);

module.exports = ChabotNode;