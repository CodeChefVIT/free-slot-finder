const fs = require('fs');
const path = require('path');
const multer = require('multer');
var mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const {PythonShell} = require("python-shell");

const app = express();

// const {create} = require('./model/UserSlots'); 
const UserSlots = require('./model/UserSlots');

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

  // Options for running python script  
  var options = {
    mode: 'text',
    args: [newfilepath]// pass arguments to the script here
  };

  PythonShell.run('final.py', options, function (err, results) {
    if (err) throw err;
    console.log(results);

    new UserSlots({'name': req.body.text, 'timetable': results})
    .save()
    .then((data)=>{
      console.log(data)
      res.render('upload', {results: data})
    })
    .catch((err)=>console.log(err))

    // create({'name': newfilepath, 'timetable': results})
    // .then((d) => res.json(d))
    // .catch(err => console.log(err));
  })
})
})


app.get('/compare', function(req, res){
UserSlots.find({}, {_id: 0, name: 1})
  .then((data)=>{
  var newdata=JSON.stringify(data)
  console.log(data)
  res.render('compare', {data:data})
  })
  .catch((err)=>console.log(err))
})

app.get('/comparett', function(req, res){
  // res.render('comparett')
  var arr = req.query.check
  console.log(arr)
  console.log('heloooooo')
  UserSlots.find({name: { $in: arr}}, {_id: 0, name: 1, timetable: 1})
    .then((data)=>{
      var datalen=data.length
      console.log('next log is json data of timetables')
      console.log(data)
      console.log('next log is the size of json data of timetables (i.e. the number of checkboxes selected)')
      console.log(datalen)
      console.log('next log is the timetable of first person selected')
      // console.log(data[0].timetable)
      var first = JSON.parse(data[0].timetable)
      console.log(first)
      var newarr= []
      
      for(var j = 0; j< 5; j++){
        newarr[j]=[]
        for(var k = 0; k<22; k++){
          newarr[j][k]=0
        }
        // console.log(data[i].timetable[0][8])
        // if(data[i].timetable)
      }

      for(var i = 1; i< data.length; i++){
        var newvar = JSON.parse(data[i].timetable)
        console.log('next log is the timetable of person ' + (i+1))
        console.log(newvar)
        // console.log('workingloop')
        for(var j = 0; j< 5; j++){
          // newarr[j]=[]
          for(var k = 0; k<22; k++){
            if(first[j][k]==1 && newvar[j][k]==1){
              newarr[j][k]=newarr[j][k]+1
            }
            else{
              newarr[j][k]=0;
              // console.log('0')
            }
          }
          // console.log(data[i].timetable[0][8])
          // if(data[i].timetable)
        }
      }
      console.log('mid array')
      console.log(newarr)

      var maxRow = newarr.map(function(row){ return Math.max.apply(Math, row); });
      var max = Math.max.apply(null, maxRow);

      console.log(max)

      for(var j = 0; j< 5; j++){
        // newarr[j]=[]
        for(var k = 0; k<22; k++){
          if(newarr[j][k]!==max){
            newarr[j][k]=0
          }
        }
        // console.log(data[i].timetable[0][8])
        // if(data[i].timetable)
      }

      console.log('final array')
      console.log(newarr)

      res.send(newarr)

      // let obj1=data
      // JSON.stringify(obj1)
      // console.log(obj1)
    })
})

// Set port number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));