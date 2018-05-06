let fs = require('fs');
let file = fs.createWriteStream('demo.txt');

for(let i = 0; i < 100000; i++) {
    file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ullam architecto rem eius nisi deserunt vitae magni quae obcaecati, ipsam accusantium minima ex, animi explicabo quidem minus! Maxime, perspiciatis, vero.')
}

file.end();