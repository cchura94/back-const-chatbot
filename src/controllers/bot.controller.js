const Bot = require('../models/Bot.js');

module.exports = {
    getAll: async (req, res) => {
        try {
            const bots = await Bot.findAll({order: [['createdAt', 'DESC']]});
            return res.json(bots);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            console.log(req.body);
            const newBot = await Bot.create(req.body);
            return res.status(201).json(newBot);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const bot = await Bot.findByPk(req.params.id);
            if (!bot) {
                return res.status(404).json({ error: 'Bot not found' });
            }
            return res.json(bot);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const {id} = req.params;
            await Bot.update(req.body, { where: { id } });
            const botActualizado = await Bot.findByPk(id);
            return res.status(200).json(botActualizado);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params;
            await Bot.destroy({ where: { id } });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}