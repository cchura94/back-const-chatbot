async function enviarMensaje(){
    const response = await fetch("https://graph.facebook.com/v25.0/388467921024360/messages", 
    {
        method: 'POST',
        headers: {
            Authorization: "Bearer EAANqZBXo2a88BRZA9I43eSDkcJECIKsafjgGc1xglTixLYOo8pJ5kAmXdB5JQaYy33NXFKPxnXbuEA5msYtrZBP9GlumAxMgEXl9gSLXsX3mA8Qbd8pqd9zPif09jiBoxgDVIGaUqeN71IFQJrjg3c4o3AWVuogGAjMsNSB07YzaHcKMaMZAoEZBGfnkVyPRi8z8C50GAqTZBn0Gqnc0NzNHgKqAzmAT2H7RZCFE2SvNb16O2IrJJvh66v02MjQG4yJ3BuFv3COtkErk75VBQdC3O3G",
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
            Authorization: "Bearer EAANqZBXo2a88BRZA9I43eSDkcJECIKsafjgGc1xglTixLYOo8pJ5kAmXdB5JQaYy33NXFKPxnXbuEA5msYtrZBP9GlumAxMgEXl9gSLXsX3mA8Qbd8pqd9zPif09jiBoxgDVIGaUqeN71IFQJrjg3c4o3AWVuogGAjMsNSB07YzaHcKMaMZAoEZBGfnkVyPRi8z8C50GAqTZBn0Gqnc0NzNHgKqAzmAT2H7RZCFE2SvNb16O2IrJJvh66v02MjQG4yJ3BuFv3COtkErk75VBQdC3O3G",
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
            Authorization: "Bearer EAANqZBXo2a88BRZA9I43eSDkcJECIKsafjgGc1xglTixLYOo8pJ5kAmXdB5JQaYy33NXFKPxnXbuEA5msYtrZBP9GlumAxMgEXl9gSLXsX3mA8Qbd8pqd9zPif09jiBoxgDVIGaUqeN71IFQJrjg3c4o3AWVuogGAjMsNSB07YzaHcKMaMZAoEZBGfnkVyPRi8z8C50GAqTZBn0Gqnc0NzNHgKqAzmAT2H7RZCFE2SvNb16O2IrJJvh66v02MjQG4yJ3BuFv3COtkErk75VBQdC3O3G",
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
            Authorization: "Bearer EAANqZBXo2a88BRZA9I43eSDkcJECIKsafjgGc1xglTixLYOo8pJ5kAmXdB5JQaYy33NXFKPxnXbuEA5msYtrZBP9GlumAxMgEXl9gSLXsX3mA8Qbd8pqd9zPif09jiBoxgDVIGaUqeN71IFQJrjg3c4o3AWVuogGAjMsNSB07YzaHcKMaMZAoEZBGfnkVyPRi8z8C50GAqTZBn0Gqnc0NzNHgKqAzmAT2H7RZCFE2SvNb16O2IrJJvh66v02MjQG4yJ3BuFv3COtkErk75VBQdC3O3G",
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

