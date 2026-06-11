const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('<h1>Docker & GitHub Actions automaatio toimii AWS-palvelimella! 🐳🚀</h1>');
});

app.listen(PORT, () => {
    console.log(`Palvelin pyörii kontissa portissa ${PORT}`);
});