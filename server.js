const express = require("express"); //Back-end framework/infraestructura
const mongoose = require("mongoose"); // ODM para la comunicación con MongoDB

mongoose.Promise = global.Promise;
//mongo user: stewart - stewart
const bodyParser = require("body-parser"); // para poder sacar la data del body

const app = express(); // inicializando express
const items = require("./routes/api/items");

//-- middleware
app.use(bodyParser.json());

// Configuracion basedatos
const db = require("./config-data/key").mongoURI;

//conexión
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // para arreglar el error de deprecado-
  .then(() => {
    console.log("Conectado con MongoDB");
  })
  .catch(error => {
    console.log("Error conectandose a MongoDB");
    console.log(error);
  });
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// Usar Routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server inició en puerto : " + port));
