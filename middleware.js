const express = require('express');

const app = express();

app.use((req, res, next) => {
	console.log('<h1>HELLLLOOO</h1')
	next();
})

app.get('/', (req, res) => {
	/*const user = {
		name: 'Sally',
		hobby: 'soccer'
	}	*/
	res.send('testest');
});

app.listen(3000);

