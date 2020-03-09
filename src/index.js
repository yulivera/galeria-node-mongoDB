const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');

// Inicializar
const app = express();
require('./database');
 
// Configura settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //confi carpeta views
app.set('view engine', 'ejs'); // motor de plantilla ejs, integrado por defecto en node

// Middlewares
app.use(morgan('dev')); // consola, peticiones de servidor url
app.use(express.urlencoded({extended: false})); // entender datos enviados de formularios
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads'),
	filename: (req, file, cb, filename) => {
		cb(null, uuid()+ path.extname(file.originalname));
	}
});

// input de name: image,
app.use(multer({
	storage: storage
}).single('image'));

// Variable Global
app.use((req,res,next) => {
	app.locals.format = format;
	next();
})

// Routes
app.use(require('./routes/index'));

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Start the Serve
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});
