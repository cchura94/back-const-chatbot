const express = require("express");
const whatsappController = require("./../controllers/whatsapp.controller");

const router = express.Router();

const verify_token = process.env.WHATSAPP_VERIFY_TOKEN || "MI_TOKEN_SEGURO"
// Rutas

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


module.exports = router;
