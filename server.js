const express = require('express');
const app = express(); // Dette MÅ komme før du bruker app

// Gjør public-mappa tilgjengelig
app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
  console.log(`Serveren kjører på http://localhost:${port}`);
});