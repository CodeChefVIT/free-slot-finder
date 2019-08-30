const fs = require('fs');
const path = require('path');
const multer = require('multer');
const express = require('express');
var bodyParser = require('body-parser');
const {PythonShell} = require("python-shell");

const app = express();

app.use(bodyParser.json());

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

app.post('/upload', function(req, res) {
	var upload = multer({
		storage: storage
	  }).single('file')
  	upload(req, res, function(err) {
 
  // console.log(req.file)
  // console.log(req.body.text)    
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

  // Options for running python script  
  var options = {
    mode: 'text',
		pythonPath: "/usr/bin/python",
    args: [newfilepath]// pass arguments to the script here
  };

  PythonShell.run('script.py', options, function (err, results) {
    if (err) throw err;
    console.log(results);
    
    
    // Read the temporary text file
    // fs.readFile("./public/temp.txt", "utf-8", (err, data) => { 
    //   if (err) {  
    //     console.log(err)  } 
    //   else { 
    //     console.log(data); 
    //   }})
    
      res.render('upload', { results: results });   

    // console.log('Ran python file');
    })
  })
})

// Set port number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

