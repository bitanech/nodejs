let Converter = require('./converter.js');
let https = require('https');

let commission = 10;
let converter;

https.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });

    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);

            for(let i = 0; i < parsedData.length; i++) {
                if(parsedData[i].ccy === 'USD') {
                    var sell = +parsedData[i].sale;
                    var buy = +parsedData[i].buy;
                }
            }

            converter = new Converter(buy, sell, commission);
            console.log(converter.buyUs(1000));
            console.log(converter.sellUs(1000));

        } catch (e) {
            console.error(e.message);
        }
    });

}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
