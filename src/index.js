const express = require("express");
const router = require("./routes");

const PORT = 3000;

const app = express();

// req.body
app.use(express.json());

app.use("/api", router);

app.get("/", function(req, res){
    return res.json({mensaje: "Api de Node"});
});


app.listen(PORT, function(){
    console.log("Servidor iniciado en el puerto "+PORT);
});