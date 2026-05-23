const axios = require("axios");

const whatsappUrl = `https://graph.facebook.com/v25.0/388467921024360/messages`
const headers = {
    Authorization: "Bearer "+process.env.WHATSAPP_ACCESS_TOKEN,
    "Content-Type": "application/json"
}

async function sendMessage(number, messageData){
    const payload = buildPayload(number, messageData);
    const respuesta = await axios.post(whatsappUrl, payload, {headers});
    return respuesta.data;
}

function buildPayload(to, data){
    const base = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to
    }

    switch (data.type) {
        case "text":
            return { ...base, type: "text", "text": {body: data.body} }            
        case "image":
            return { ...base, type: "image", "image": {link: data.link, caption: data.caption} }
        case "document":
            return { ...base, type: "document", "document": {"link": data.link, caption: data.caption, "filename": data.filename} }
        case "video":
            return { ...base, type: "video", "video": {link: data.link, caption: data.caption} }
        case "audio":
            return { ...base, type: "audio", "audio": {link: data.link, caption: data.caption} }
        case "location":
            return { ...base, type: "location", "location": {longitude: data.longitude, latitude: data.latitude, name: data.name, address: data.address} }            
    
        default:
            break;
    }
}

module.exports = {
    sendMessage
}