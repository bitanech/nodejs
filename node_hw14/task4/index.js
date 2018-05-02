let http = require('http');
let request = require('request');
let fs = require('fs');
let url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3';

request(url, function (error, response, body) {
    console.log(JSON.parse(body));
    fs.writeFile('index.html', JSON.parse(body) , (err) => {
        if(err) throw err;
    });
});

let app = http.createServer((req,res) => {
    if(req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            res.end(data);
        });
    }
}).listen(8000, () => {
    console.log('Server on localhost:8000');
})