let fs = require("fs");

let data = 'Hello';

fs.readFile('file.txt', (err) => {
    if(err){
        fs.writeFile('file.txt', data, (err) => {
  			if (err) throw err;
  			console.log('The file has been saved!');
		});
    }else {
    	fs.appendFileSync("file.txt", `${require('os').EOL}${data}`);
    }
});

