let http = require('http');
let fs = require('fs');
const stats = fs.statSync('demo.txt').size / 1000000.0;
let url = (stats < 10)? '/file' : '/stream';

http.createServer((req,res) => {
    if(req.url === '/stream' && url === '/stream') {
        let stream = fs.createReadStream('demo.txt');
        stream.pipe(res);
        console.log(stats);
    } else if (req.url === '/file' && url === '/file') {
        fs.readFile('demo.txt', (err,data) => {
            res.write(data);
            res.end();
        });
    }
}).listen(3000, () => {
    console.log('at localhost:3000');
});


// pm2 установить глобально
// Запуск через pm2 start index.js
// Остановка pm2 stop index.js и pm2 kill