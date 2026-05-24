require('dotenv').config() // .env
const express = require("express");
const router = require("./routes");
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

// Crear una instancia de Express
const app = express();

// req.body
app.use(express.json());

// Rutas
app.use("/api", router);

app.get("/", function(req, res){
    return res.json({mensaje: "Api de Node"});
});

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync({ force: false}).then(() => {
    console.log("Base de datos sincronizada");
}).catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
});

// Iniciar el servidor
app.listen(PORT, function(){
    console.log("Servidor iniciado en el puerto "+PORT);
});