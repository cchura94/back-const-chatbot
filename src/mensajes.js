async function enviarMensaje(){
    const response = await fetch("https://graph.facebook.com/v25.0/388467921024360/messages", 
    {
        method: 'POST',
        headers: {
            Authorization: "Bearer EAANIKtenp4QBRSeS2JHBBX5nofZBplslKDJBRaSLqpF9QuWGR3LZCqx1kuKOfy4WwOL7Pil0sxwooJhmgqD5Ngpnp4xWgk7buPHhax2jUMsrKTeDHzFxWpVWHavsciYNyy2EjKPDZANqZBwD5PNSQSfm7NxDjTTNTym30q32FObXTkvso2JvkBurGYEsHPQqaGgZCUZBksGuoDFyUXKpwRRKhMlZCLhb4FNZCIck2SzgCjJ6Xc3ZAzx4JiWvE5S285mJq5IZBMpMF0MqzEVSYZAsL0KUw3WG28ZD",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "to": "59173277937",
            "type": "template",
            "template": {
                "name": "hello_world",
                "language": {
                    "code": "en_US"
                }
            }
        })
    });

    // ENVIAR MENSAJE TEXTO

    const response2 = await fetch("https://graph.facebook.com/v25.0/388467921024360/messages", 
    {
        method: 'POST',
        headers: {
            Authorization: "Bearer EAANIKtenp4QBRSeS2JHBBX5nofZBplslKDJBRaSLqpF9QuWGR3LZCqx1kuKOfy4WwOL7Pil0sxwooJhmgqD5Ngpnp4xWgk7buPHhax2jUMsrKTeDHzFxWpVWHavsciYNyy2EjKPDZANqZBwD5PNSQSfm7NxDjTTNTym30q32FObXTkvso2JvkBurGYEsHPQqaGgZCUZBksGuoDFyUXKpwRRKhMlZCLhb4FNZCIck2SzgCjJ6Xc3ZAzx4JiWvE5S285mJq5IZBMpMF0MqzEVSYZAsL0KUw3WG28ZD",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "59173277937",
            "type": "text",
            "text": {
                "preview_url": true,
                "body": "Hola desde Node..."
            }
        })
    });


    // ENVIAR MENSAJE IMAGEN

    const response3 = await fetch("https://graph.facebook.com/v25.0/388467921024360/messages", 
    {
        method: 'POST',
        headers: {
            Authorization: "Bearer EAANIKtenp4QBRSeS2JHBBX5nofZBplslKDJBRaSLqpF9QuWGR3LZCqx1kuKOfy4WwOL7Pil0sxwooJhmgqD5Ngpnp4xWgk7buPHhax2jUMsrKTeDHzFxWpVWHavsciYNyy2EjKPDZANqZBwD5PNSQSfm7NxDjTTNTym30q32FObXTkvso2JvkBurGYEsHPQqaGgZCUZBksGuoDFyUXKpwRRKhMlZCLhb4FNZCIck2SzgCjJ6Xc3ZAzx4JiWvE5S285mJq5IZBMpMF0MqzEVSYZAsL0KUw3WG28ZD",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "59173277937",
            "type": "image",
            "image": {
                "link": "https://blumbitvirtual.edtics.com/pluginfile.php/6773/course/overviewfiles/Post%20N8N.jpg",
                "caption": "Hola este es una descripción de la imágen"
            }
        })
    });


    // botones
    const response4 = await fetch("https://graph.facebook.com/v25.0/388467921024360/messages", 
    {
        method: 'POST',
        headers: {
            Authorization: "Bearer EAANIKtenp4QBRSeS2JHBBX5nofZBplslKDJBRaSLqpF9QuWGR3LZCqx1kuKOfy4WwOL7Pil0sxwooJhmgqD5Ngpnp4xWgk7buPHhax2jUMsrKTeDHzFxWpVWHavsciYNyy2EjKPDZANqZBwD5PNSQSfm7NxDjTTNTym30q32FObXTkvso2JvkBurGYEsHPQqaGgZCUZBksGuoDFyUXKpwRRKhMlZCLhb4FNZCIck2SzgCjJ6Xc3ZAzx4JiWvE5S285mJq5IZBMpMF0MqzEVSYZAsL0KUw3WG28ZD",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "59173277937",
            "type": "image",
             "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "Hola, en que tecnología estas Interesado? selecciona una opción"
                },
                "footer": {
                    "text": "Debe elegir una opción"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "1",
                                "title": "Javascript"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "2",
                                "title": "php"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "3",
                                "title": "Java"
                            }
                        }
                       
                    ]
                }
            }
        })
    });

}




enviarMensaje()

