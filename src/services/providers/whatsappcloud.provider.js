const axios = require("axios");

const whatsappUrl = `https://graph.facebook.com/v25.0/388467921024360/messages`

const headers = {
    Authorization: "Bearer EAANIKtenp4QBRSeS2JHBBX5nofZBplslKDJBRaSLqpF9QuWGR3LZCqx1kuKOfy4WwOL7Pil0sxwooJhmgqD5Ngpnp4xWgk7buPHhax2jUMsrKTeDHzFxWpVWHavsciYNyy2EjKPDZANqZBwD5PNSQSfm7NxDjTTNTym30q32FObXTkvso2JvkBurGYEsHPQqaGgZCUZBksGuoDFyUXKpwRRKhMlZCLhb4FNZCIck2SzgCjJ6Xc3ZAzx4JiWvE5S285mJq5IZBMpMF0MqzEVSYZAsL0KUw3WG28ZD",
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
    
        default:
            break;
    }
}

module.exports = {
    sendMessage
}