const express = require('express');
const multer = require('multer');
const path = require('path');
var bodyParser = require('body-parser');
const {PythonShell} = require("python-shell");
var upload = multer({ dest: 'uploads/' })
const app = express();
app.use(bodyParser.json());

// Set static folder
app.use(express.static('./public'));


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

app.post("/upload", upload.single("file"), function(req, res) {
  let filepath = "uploads/" + req.file.filename
  let newfilepath = "uploads/" + req.body.text
  console.log(req.file)
  console.log(req.body.text)
  //fs.rename(filepath, newfilepath, (err) => {

  //})

PythonShell.run('script.py', {args:[filepath]}, function (err) {
  if (err) throw err;
  console.log('Ran python file');
  res.sendFile(__dirname + "/public/upload.html");
})
});

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