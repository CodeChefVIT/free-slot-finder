const fs = require('fs');
const path = require('path');
const multer = require('multer');
var mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const {PythonShell} = require("python-shell");

const app = express();

const {create} = require('./model/UserSlots');



app.use(bodyParser.json());

// DataBase Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Set static folder
app.use(express.static('./public'));

// Set template engine
app.set('view engine', 'ejs');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  // Condition check
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Set storage engine
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/uploads')
	},
	filename: function(req, file, callback,) {
    // console.log(file)
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

app.post('/upload', function(req, res, next) {
	var upload = multer({
		storage: storage
	  }).single('file')
  	upload(req, res, function(err) {

	if (err) 
		return res.json({err}).status(400)
  
    console.log(req.file)
    
  let filepath = __dirname + "/public/uploads/" + req.file.filename
  let newfilepath = __dirname + "/public/uploads/" + req.body.text 
  
  // Rename already uploaded file from random name to name given in form
  fs.rename(filepath, newfilepath, (err) => {
    if (err) throw err;
    // console.log('Rename complete!');
    });

    // console.log(newfilepath);


  // Options for running python script  
  var options = {
    mode: 'text',
    args: [newfilepath]// pass arguments to the script here
  };

  PythonShell.run('final.py', options, function (err, results) {
    if (err) throw err;
    console.log(results);

    create({'name': newfilepath, 'timetable': results})
    .then((d) => res.json(d))
    .catch(err => console.log(err));
  })
})
})
// Set port number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));