const cloudProvider = require("./whatsappcloud.provider");
const evolutionProvider = require("./evolutionapi.provider");

const provider = 'cloud';

function getWhatsappProvider(){
    switch (provider) {
        case "cloud": 
            return cloudProvider;
        case "evolution": 
            return evolutionProvider;
    
        default:
            throw new Error("Proveedor de whatsapp no soportado");
    }
}

module.exports = getWhatsappProvider();