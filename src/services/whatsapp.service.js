const whatsappProvider = require("./providers");

async function enviarMensajeWhatsapp(numero, mensaje, botConfig){
    return await whatsappProvider.sendMessage(numero, mensaje, botConfig);
}

module.exports = {
    enviarMensajeWhatsapp
}
