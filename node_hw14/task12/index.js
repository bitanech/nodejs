let http = require('http');
let fs = require('fs');
let qs = require('querystring');
let Event = require('events');
let evt = new Event();

evt.on('singUp', () => {
    let date = new Date();
    console.log(`User: signed up, time - ${date}`);
});

evt.on('about', (obj) => {
    let date = new Date();
    console.log(`User:${obj.login}, password:${obj.password}`);
});

evt.on('postRequest', () => {
    console.log('User send post request');
});

evt.on('signOut', () => {
    console.log('User singned out');
});

evt.on('stop', () => {
    console.log("Server is stopped by user");
    app.close();
});


let app = http.createServer((req,res) => {
    if(req.url === '/') {
        res.end('Hello World');
    } else if(req.url === '/contacts') {
        fs.readFile('index.html', 'utf8', (err,data) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(data);
        });
    } else if(req.method === 'POST' && req.url === '/signup') {
        let body = '';

        req.on('data',(data) => {
            body += data;
            evt.emit('postRequest');
        });

        req.on('end', () => {
            date = new Date();
            post = qs.parse(body);
            evt.emit('singUp', post);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`Hello ${post.login}
                <a href='/signout'>Sign out</a>`);
            res.end();
        });
    } else if(req.url === '/signout') {
        evt.emit('signOut')
        res.end('signout')
    } else if(req.url === '/about') {
        evt.emit('about');
        res.end('about');
    } else if(req.url === '/stop') {
        evt.emit('stop');
        res.end();
    }
}).listen(8000, () => {
    console.log('Server running on localhost:8000');
});