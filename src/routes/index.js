const { Router } = require('express');
const router  = Router();
const path = require('path');
const { unlink } = require('fs-extra');

const Image = require('../models/image');

// mostrar todas las imagenes subidas
router.get('/', async (req, res) => {

	const images = await Image.find();
	// console.log(images);
	res.render('index', { images });
	// res.send('mostrar todas las imagenes');
	
});

router.get('/upload', (req, res) => {
	res.render('upload');
});

// enviar imagen guardar en mongo
router.post('/upload', async (req, res) => {

	const image = new Image();

	image.title = req.body.title;
	image.description = req.body.description;
	image.filename = req.file.filename;
	image.path = '/img/uploads/'+req.file.filename;
	image.originalname = req.file.originalname;
	image.mimetype = req.file.mimetype;
	image.size = req.file.size;
	
	// console.log(req.file);
	// console.log(image);
	await image.save();
	res.redirect('/');
});

// ver una sola imagen
router.get('/image/:id', async (req, res) => {
	const { id } = req.params;
	const image = await Image.findById(id);
	// console.log(image);
	res.render('profile', { image });
});

router.get('/image/:id/delete', async (req, res) => {
	// console.log(req.params.id);
	// res.send('Eliminar imagen');
	const { id } = req.params;
	const image = await Image.findByIdAndDelete(id);
	await unlink(path.resolve('./src/public'+ image.path));
	res.redirect('/');
});

module.exports = router;
