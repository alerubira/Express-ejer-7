const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware cors
const app = express();
const port = 3000;
app.use(cors()); // Usa el middleware cors para permitir solicitudes desde cualquier origen
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let numeros = [];

// Ruta para manejar las solicitudes POST
app.post('/numero/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (!isNaN(num)) {
    numeros.push(num);
    res.json(numeros);
  } else {
    res.status(400).json({ error: true });
  }
});

// Ruta para manejar las solicitudes DELETE
app.delete('/numero/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (!isNaN(num)) {
    numeros = numeros.filter(n => n !== num);
    res.json(numeros);
  } else {
    res.status(400).json({ error: true });
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
      res.status(400).json({ error: true });
    }
  } else {
    res.status(400).json({ error: true });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
