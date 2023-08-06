const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/favicon.svg', (req, res) => {
    res.sendFile(__dirname+'/favicon.svg');
});

app.get('/api/random-word', async (req, res) => {
    const fileStream = fs.createReadStream(__dirname+'Genshin.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let words = [];
    for await (const word of rl) {
        words.push(word);
    }

    let randomWord = words[Math.floor(Math.random() * words.length)];
    res.send(randomWord);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
