const whatsappService = require("./../services/whatsapp.service");

async function enviarMensaje(req, res){
    try {
        const { numero, mensaje } = req.body;

        if(!numero || !mensaje){
            return res.status(400).json({success: false, error: "Debes enviar un número y un mensaje"})
        }


        // procesar el mensaje
        const response = await whatsappService.enviarMensajeWhatsapp(numero, mensaje);

        return res.status(200).json({success: true, data: response});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, error: error.message});
    }
}

async function recibirMensaje(req, res){

    
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if(!value?.messages){
        return res.sendStatus(200);
    }
    
    const phoneId = value.metadata?.phone_number_id;

    const message = value.messages[0];
    const numero = message.from;

    console.log(value.contacts[0].profile.name);

    let mensajeUsuario = "";
    if(message.type === "text"){
        mensajeUsuario = message.text.body;
    }

    await whatsappService.enviarMensajeWhatsapp(numero, {type: "text",body: "Hola soy un Bot"});

    return res.send("ok");
}

module.exports = {
    enviarMensaje,
    recibirMensaje
}