const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pinteresdb', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));