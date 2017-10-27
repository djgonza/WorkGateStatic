require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const isOnline = require('is-online');
var path = require('path');
var router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // Carpeta para los archivos estaticos

/**
* Define todas las rutas de la aplicacion
*/
app.use('/', router.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve('index.html'));
}));
app.use('/index.html', router.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve('index.html'));
}));

//Para pruebas
app.use('/ping', router.get('/', (req, res) => {
	isOnline().then(online => {
	   res.status(200).send({ping: "Alive"});
	});
}));

//Errores 404
app.use(function(req, res, next) {
	res.status(404).sendFile(path.resolve('404.html'));
});

// start server
var port = 4000;
if (process.env.NODE_ENV == "production"){
	port = process.env.PORT;
}

var server = app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
