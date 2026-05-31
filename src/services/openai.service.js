// npm install openai
const { OpenAI } = require('openai');




async function generarRespuestaAI(mensajeUsuario, historialAnterior=[], promptSistema, apikey){
    try {
        const openai = new OpenAI({
            apiKey: apikey || process.env.OPENAI_API_KEY,
        });

        const messages = [
            { role:'system', content: promptSistema },
            ...historialAnterior,
            { role:'user', content: mensajeUsuario }
        ]

        const completion = await openai.chat.completions.create({
            model: 'gpt-5',
            messages: messages
        });
    
        
        const respuesta= completion.choices[0].message.content;
        return { respuesta, nuevoHistorial: [...historialAnterior, { role:'user', content: mensajeUsuario }, { role:'assistant', content: respuesta }] };
    
    } catch (error) {
        console.error("Error generating AI response:", error);
        return {respuesta: "Lo siento, ha ocurrido un error al generar la respuesta.", nuevoHistorial: historialAnterior };
    }
    
}

module.exports = {
    generarRespuestaAI
}