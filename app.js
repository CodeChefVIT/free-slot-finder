const express = require('express');
const multer = require('multer');
const path = require('path');
var bodyParser = require('body-parser');
const {PythonShell} = require("python-shell");
const app = express();
app.use(bodyParser.json());

// Run python script
PythonShell.run('script.py', null, function (err) {
  if (err) throw err;
  console.log('Ran python file');
});

// Set 'public' folder as static
app.use(express.static('./public'));

// Set storage engine
var storage = multer.diskStorage({
  destination: './public/uploads/',
  // destination: function(req, file, callback) {
  //   callback(null,__dirname + "/public/uploads");
  // },
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + file.originalname);
  }
});

// Init Upload
var upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('text');

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

// EJS
// app.set('view engine', 'html');

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
      if (err) {
          return res.end("Something went wrong!");
      }
      // return res.end("File uploaded sucessfully!.");
  });
  res.sendFile(__dirname + "/public/upload.html");
});

// app.get("/upload", function(req, res) {
//   res.sendFile(__dirname + "/public/upload.html");
// });

// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       res.render('index', {
//         msg: err
//       });
//     } else {
//       if(req.file == undefined){
//         res.render('index', {
//           msg: 'Error: No File Selected!'
//         });
//       } else {
//         res.render('index', {
//           msg: 'File Uploaded!',
//           file: `uploads/${req.file.filename}`
//         });
//       }
//     }
//   });
// });



const PORT = process.env.PORt || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));