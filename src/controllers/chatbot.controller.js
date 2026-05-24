const Bot = require('../models/Bot.js');
const ChabotNode = require('../models/ChatbotNode.js');
const Option = require('../models/Option.js');

module.exports = {
    getAllNodes: async (req, res) => {
        try {
            const { botId } = req.query;

            if(!botId){
                return res.status(400).json({ error: "botId es requerido" });
            }

            const nodos = await ChabotNode.findAll({
                where: { botId:botId },
                order: [['createdAt', 'ASC']],
                include: [{model: Option, as: 'opciones'}] 
            });

            return res.json(nodos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    createNode: async (req, res) => {
        try {
            const newChatbotNode = await ChabotNode.create(req.body);
            return res.status(201).json(newChatbotNode);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    getOneNode: async (req, res) => {
        try {
            const chatbotNode = await ChabotNode.findByPk(req.params.id);
            if (!chatbotNode) {
                return res.status(404).json({ error: 'ChatbotNode not found' });
            }
            return res.json(chatbotNode);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    updateNode: async (req, res) => {
        try {
            const {id} = req.params;
            const node = await ChabotNode.update(req.body, { where: { id } });
            return res.status(200).json(node);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    deleteNode: async (req, res) => {
        try {
            const {id} = req.params;
            await ChabotNode.destroy({ where: { id } });
            return res.status(204);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    createOption: async (req, res) => {
        try {
            const newOption = await Option.create(req.body);
            return res.status(201).json(newOption);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    updateOption: async (req, res) => {
        try {
            const {id} = req.params;
            const option = await Option.update(req.body, { where: { id } });
            return res.status(200).json(option);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }   

    },
    deleteOption: async (req, res) => {
        try {
            const {id} = req.params;
            await Option.destroy({ where: { id } });
            return res.status(204);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}