const express = require("express");
const whatsappController = require("./../controllers/whatsapp.controller");
const botController = require("../controllers/bot.controller");
const chatbotController = require("../controllers/chatbot.controller");

const router = express.Router();

const verify_token = process.env.WHATSAPP_VERIFY_TOKEN || "MI_TOKEN_SEGURO"
// Rutas

// Enviar mensaje a través de WhatsApp
router.post("/enviar-mensaje", whatsappController.enviarMensaje);

// aqui llega los mensajes de whatsapp y se procesan el controlador
router.post("/webhook", whatsappController.recibirMensaje);

// Verificar Webhook
router.get("/webhook", function (req, res){
    console.log("Verificando webhook...");
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
    if(mode === "subscribe" && verify_token === token ){
        console.log("Webhook verificado exitosamente.");
        return res.status(200).send(challenge);
    }else{
        return res.status(403).send("Token de verificación no coincide.");
    }
});

// CRUD Bots
router.get("/bots", botController.getAll);
router.post("/bots", botController.create);
router.get("/bots/:id", botController.getOne);
router.put("/bots/:id", botController.update);
router.delete("/bots/:id", botController.delete);

// CRUD ChabotNodes
router.get("/chatbot/nodes", chatbotController.getAllNodes);
router.post("/chatbot/nodes", chatbotController.createNode);
router.get("/chatbot/nodes/:id", chatbotController.getOneNode);
router.put("/chatbot/nodes/:id", chatbotController.updateNode);
router.delete("/chatbot/nodes/:id", chatbotController.deleteNode);

// CRUD Options
router.post("/chatbot/options", chatbotController.createOption);
router.put("/chatbot/options/:id", chatbotController.updateOption);
router.delete("/chatbot/options/:id", chatbotController.deleteOption);

module.exports = router;
