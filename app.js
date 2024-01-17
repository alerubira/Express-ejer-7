const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware cors
const app = express();
const port = 3000;
const soloNumeros="El valor ingresado debe ser un numero";
app.use(cors()); // Usa el middleware cors para permitir solicitudes desde cualquier origen
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


let numeros = [];

// Ruta para manejar las solicitudes POST
app.post('/numero/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (!isNaN(num)) {
    numeros.push(num);
    res.json(numeros);
  } else {
    res.json(soloNumeros).status(400);
    //res.json("el valor ingresado debe ser un numero");
  }
});

// Ruta para manejar las solicitudes DELETE
app.delete('/numero/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (!isNaN(num)) {
    numeros = numeros.filter(n => n !== num);
    res.json(numeros);
  } else {
    //res.status(400).json({ error: true });
    res.json(soloNumeros).status(400);
  }
});

// Ruta para manejar las solicitudes PUT
app.put('/numero/:oldNum/:newNum', (req, res) => {
  const oldNum = parseInt(req.params.oldNum);
  const newNum = parseInt(req.params.newNum);
  if (!isNaN(oldNum) && !isNaN(newNum)) {
    const index = numeros.indexOf(oldNum);
    if (index !== -1) {
      numeros[index] = newNum;
      res.json(numeros);
    } else {
      //res.status(400).json({ error: true });
      res.json("El numero no se encuentra").status(400);
    }
  } else {
    //res.status(400).json({ error: true });
    res.json(soloNumeros).status(400);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
