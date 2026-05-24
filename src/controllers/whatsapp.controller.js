const whatsappService = require("./../services/whatsapp.service");
const openAiService = require("./../services/openai.service");
const Bot = require("../models/Bot");
const { UserContext, ChabotNode, Option } = require("../models");

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

    const botConfig = await Bot.findOne({ where: { identifier: phoneId } });

    if(!botConfig){
        console.log("No se encontró configuración para el phone_number_id:", phoneId);
        return res.sendStatus(200);
    }

    const message = value.messages[0];
    const numero = message.from;

    let mensajeUsuario = "";
    if(message.type === "text"){
        mensajeUsuario = message.text.body;
    }

    if(message.type === "interactive"){
        if(message.interactive.type === "button_reply"){
            mensajeUsuario = message.interactive.button_reply.title;
        }else if(message.interactive.type === "list_reply"){
            mensajeUsuario = message.interactive.list_reply.title;
        }
    }

    // buscar o crear el usercontext del cliente para mantener el contexto de la conversación
    let [context, created] = await UserContext.findOrCreate({
        where: { phone_number: numero, botId: botConfig.id },
        defaults: { current_node: "main", botId: botConfig.id }
    });

    if(created){
        await enviarMensajeDinamico(numero, "main");
        return res.sendStatus(200);
    }

    const nodoData = await ChabotNode.findOne({
        where: { node_key: context.current_node}
    });

    const opcion = await Option.findOne({
        where: {
            chatbotNodeId: nodoData.id,
            key: mensajeUsuario
        }
    });

    if(!opcion){
        const promptActual = botConfig.prompt || "Eres un asistente responde en menos de 30 palabras";

        const { respuesta, nuevoHistorial} = await openAiService.generarRespuestaAI(mensajeUsuario, context.ai_history || [], promptActual);

        const historialLimitaldo = nuevoHistorial.slice(-10);
        await context.update({ ai_history: historialLimitaldo });

        await whatsappService.enviarMensajeWhatsapp(numero, {type: "text", body: respuesta});
        
    }

    if(opcion.respuesta){
        await whatsappService.enviarMensajeWhatsapp(numero, opcion.respuesta);
    }

    if(opcion.next_node_id){
        const nodeData2 = await ChabotNode.findOne({ where: { id: opcion.next_node_id} });

        await context.update({ current_node: nodeData2.node_key });

        await enviarMensajeDinamico(numero, nodeData2.node_key);
    }

    return res.send("ok");
}


async function enviarMensajeDinamico(numero, nodeId){
    const nodo = await ChabotNode.findOne({ where: { node_key: nodeId}, include: [{model: Option, as: 'opciones'}] });

    if(!nodo){
        console.log("Nodo no encontrado:", nodeId);
        return;
    }

    const opcionesTexto = nodo.opciones.map(opt => `- 👉 *${opt.key}*: ${opt.text}`).join("\n");
    const mensajeFinal = `${nodo.mensaje}\n\n${opcionesTexto}\n\n> *Indícanos qué opción te interesa conocer!* `;
    await whatsappService.enviarMensajeWhatsapp(numero, {type: "text", body: mensajeFinal});
}

module.exports = {
    enviarMensaje,
    recibirMensaje
}