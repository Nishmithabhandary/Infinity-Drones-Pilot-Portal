const express=require('express');
const app=express();

app.use(express.json());
const expressLayouts = require("express-ejs-layouts");
const bodyparser = require('body-parser');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

//const signup=require('./Router/index')



//app.use(signup)
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));



app.use('/login',require('./Router/index'))
app.use('/flying',require('./Router/index'))
app.use('/',require('./Router/index'))
app.use('/api',require('./Router/index'))
app.use('/upload',require('./Router/index'))
app.use('/pilotprofile',require('./Router/index'))
app.use('/result',require('./Router/index'))


app.use('/admin',require('./Router/index'))
app.use('/pilotprofile',require('./Router/index'))
app.use('/flightdetails',require('./Router/index'))
app.use('/scheduleflights',require('./Router/index'))


app.use('/scheduleflights',require('./Router/trial_admin_router'))
app.use("/",require("./Router/trial_admin_router"));
app.use('/view_flight_form',require('./Router/trial_admin_router'))
app.use('/add_flight',require('./Router/trial_admin_router'))
app.use('/all_schedules',require('./Router/trial_admin_router'))


app.use('/addflightdetails',require('./Router/admin_flightdetails_router'))
app.use("/",require("./Router/admin_flightdetails_router"));
app.use('/view_flight_details',require('./Router/admin_flightdetails_router'))
app.use('/add_flightdetails',require('./Router/admin_flightdetails_router'))
app.use('/all_flightdetails',require('./Router/admin_flightdetails_router'))
app.use('/newflightdetails',require('./Router/admin_flightdetails_router'))
app.use('/crashdetails',require('./Router/admin_flightdetails_router')) 
app.use('/edit_succesfulflightdetails',require('./Router/admin_flightdetails_router'))
app.use('/',require('./Router/admin_flightdetails_router')) 
app.use('/edit_crashdetails',require('./Router/admin_flightdetails_router'))

// app.use('/admin',require('./Router/admin_dashboard_router')) 







dotenv.config();

var mongoose = require('mongoose')
const objectId = require('mongodb')._id;
  
var fs = require('fs');
var path = require('path');
require('dotenv/config');


  
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('Mongodb connected')
    });


    app.use(express.urlencoded({ extended: true }));
//bodyparser
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());







    var multer = require('multer');
  
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
    var upload = multer({ storage: storage });

    var imgModel = require('./model');

  
    app.get('/insertpilot', (req, res) => {
        imgModel.find({}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                res.render('insertnewpilot', { items: items });
            }
        });
    });
    app.get('/all_pilots', (req, res) => {
        imgModel.find({}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                res.render('pilotlist', { items: items });
            }
        });
    });
    
    app.post('/insertpilot', upload.single('image'), (req, res, next) => {
  
      var obj = {
          name: req.body.name,
          email_id: req.body.email_id,
          mobile_no:req.body.mobile_no,
          dob:req.body.dob,
          type_of_drone_experience:req.body.type_of_drone_experience,
          honors_and_achievements:req.body.honors_and_achievements,
          
           
          img: {
              data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
              contentType: 'image/png'
          }
      }
      imgModel.create(obj, (err, items) => {
          if (err) {
              console.log(err);
          }
          else {
              // item.save();
              console.log("project details inserted succesfully")
              res.redirect("/all_pilots");
          }
      });
  });
  app.get('/delete', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('update', { items: items });
        }
    });
});
app.get('/updatedoc',(req, res)=>{
  console.log('hi');
  res.render("updatedoc",{ layout: false})

});
app.post('/updatedoc', function(req, res, next) {
  var id = req.body.id;

  imgModel.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name= req.body.name;
 
    doc.desc= req.body.desc;
    doc.members = req.body.members;
    doc.img=req.body.img
    doc.save();
  })
  console.log("project details updated succesfully")
  res.redirect('/insertpilot');
});
app.get('/delete',(req, res)=>{
  console.log('hi');
  res.render("updatedoc",{ layout: false})

});

app.post('/delete', function(req, res, next) {
  var id = req.body.id;
  imgModel.findByIdAndRemove(id).exec();
  console.log("project details deleted succesfully")
  res.redirect('/all_pilots');
});

  
  
app.use(expressLayouts);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cookieParser());

app.use(express.json());

/*for bargrapgh*/


const { Pool } = require('pg');

const pool = new Pool({ connectionString: 'postgres://qfxwijux:sGtZVyXqp9PIG1EaLpZNdZX9qO1RceyE@mouse.db.elephantsql.com/qfxwijux' });


app.use(express.static('views')); // Serve static files from the 'public' directory

app.get('/data', async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query('select emailid as label,count(flight_id) as value from flight_description where result=true group by emailid');
    console.log('this is bar data............');
    console.log(result);
    console.log('this is bar data............');
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
});
app.get('/data',(req, res)=>{
    console.log('hi');
    res.render("./public/index.html",{ layout: false})
  
  });
  app.get('/data', (req, res) => {
    // Generate or retrieve your data for the bar chart here
  
    // Pass the data to the index.html template
    res.sendFile(__dirname + '/public/index.html');
  });


const PORT=process.env.PORT||1200;
app.listen(PORT,()=>{
    console.log(`Server Started at Port ${PORT}`);
});