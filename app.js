const express = require('express');
const multer = require('multer');
const path = require('path');
var bodyParser = require('body-parser');
const {PythonShell} = require("python-shell");
var upload = multer({ dest: 'uploads/' })
const app = express();
app.use(bodyParser.json());
const fs = require('fs');

// Set static folder
app.use(express.static('./public'));

// EJS
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
      res.render('upload', { fs: fs });   

      console.log(req.file)
      console.log(req.body.text)    
      let filepath = __dirname + "/public/uploads/" + req.file.filename
      let newfilepath = __dirname + "/public/uploads/" + req.body.text 
      fs.rename(filepath, newfilepath, (err) => {
        if (err) throw err;
        console.log('Rename complete!');
});
	})
})


const PORT = process.env.PORt || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// fs.readFile("./public/temp.txt", "utf-8", (err, data) => { 
//   if (err) {  
//     console.log(err)  } 
//   else { 
//     console.log(data);  < p id="demo" >  data </p>  }}) 


// app.post("/uploads", upload.single('file'), function(req, res) {
//   let filepath = "/public/uploads/" + req.file.filename
//   let newfilepath = "/public/uploads/" + req.body.text
//   console.log(req.file)
//   console.log(req.body.text)
//   //fs.rename(filepath, newfilepath, (err) => {

//   //})
// // PythonShell.run('script.py', {args:[filepath]}, function (err) {
// //   if (err) throw err;
// //   console.log('Ran python file');
// //   res.sendFile(__dirname + "/public/upload.html");
// // })
// });
