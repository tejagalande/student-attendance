const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');
//const { json } = require("sequelize");
const app = express();
const mysql=require('mysql')
const reader = require('xlsx')
const multer = require('multer');
const db=require("./models")
const excel = require("exceljs");
const Student = db.tutorials
const ATTENDANCE= db.tutorials1
const fs = require('fs');
const path = __dirname + '/';

// const Tutorial = db.tutorials;

const connection=mysql.createConnection({
      host:"localhost",
      user: "admin",  
      pass: "Admin=123",  
      database: "student_attendance",  
    
  })


app.use('/',express.static(__dirname +'/'));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')


  },
  filename: (req, file, callBack) => {
      callBack(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var corsOptions = {
  // origin: "http://localhost:8081",
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
    
  ],
};

app.use(cors(corsOptions));
const readXlsxFile = require("read-excel-file/node");
const { start } = require("repl");
const { tutorials1 } = require("./models");
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to student_attendance application." });
    res.sendFile(path + "index.html");
});

app.post('/login',function(req,res){
  datas=req.body
  res.send(JSON.stringify(datas));
})

// app.get('/getdata',function(req,res){
//   getdatas="hi";
//   res.send(JSON.stringify(getdatas));
// })



app.post('/uploadexcel',function(req,res){
  var lastid;
  datas=req.body
  // console.log(req.body)
  var string = JSON.stringify(datas);
  var objectValue = JSON.parse(string);
  college=objectValue['college'];
  branch=objectValue['branch'];
  division=objectValue['division'];
  batch=objectValue['batch'];
  // excel=objectValue['excel_file'];
  // console.log(college)
  // console.log(branch)
  // console.log(batch)
  // console.log(division)
  // console.log(batch)
   values =[
    [college,branch,division,batch]
  ]

  // console.log(values)

  connection.query("INSERT INTO excel_meta_data (`college_name`, `branch`, `division`, `batch`) VALUES ?", [values] , function (err, result) {
    if (err) throw err;
    lastid=result.insertId
    console.log(lastid)
    if(lastid)
    {
      df=connection.query('UPDATE students SET excel_meta_id = ? WHERE flag IS NULL',[lastid]);
      if(df)
      {
        connection.query('UPDATE students SET flag =1');
        res.status(success).send({
          message: "Data Submiteed Successfully: "
        });
      }
      else
      {

      }
        
    }
    else
    {
      res.send(JSON.stringify("Data Insertation Failed"));
    }
    console.log("Number of records inserted: " + result.affectedRows);
  });
  
})


app.post('/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);

  try {
      if (!file) 
      {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
      }
      
      let path = "uploads/" + req.file.filename;
      
      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();

        let tutorials = [];

        rows.forEach((row) => {
          let tutorial = {
          //   id: row[0],
            PRN: row[0],
            NAME: row[1],
            EMAIL: row[2],
            MOBILE_NUMBER: row[3],
            ATTENDANCE: row[4],

          };

          tutorials.push(tutorial);
        });


        console.log(tutorials)

        Student.bulkCreate(tutorials)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
        });
    }
    catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
    // res.send(file);
})



// app.post('/uploadexcel', upload.single('file'), (req, res, next) => {
//   const file = req.file;
//   datas=req.body
//   var string = JSON.stringify(datas);
//   var objectValue = JSON.parse(string);

// console.log(req.body)

//   college=objectValue['college'];
//   branch=objectValue['branch'];
//   division=objectValue['division'];
//   batch=objectValue['batch'];
//   excel=objectValue['excel_file'];
//   console.log(college)
//   console.log(branch)
//   console.log(batch)
//   console.log(division)
//   console.log(batch)
//   console.log(req.body.formData);
//   if (!file) {
//     const error = new Error('No File')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file);
// })

app.get('/getcollegedetails',function(req,res){

  var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "Admin=123",
    database: 'student_attendance',
  });
  
  con.connect(function(err) {
      if (err) throw err;
      //Select all customers and return the result object:
      con.query("SELECT * FROM college", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
        // console.log(JSON.stringify(result));
      });
  });

});

app.get('/getbranch',function(req,res){

  var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "Admin=123",
    database: 'student_attendance',
  });
  
  con.connect(function(err) {
      if (err) throw err;
      //Select all customers and return the result object:
      con.query("SELECT branch FROM college", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
        console.log(JSON.stringify(result));
      });
  });

});

app.post('/student_details',function(req,res){
  datas=req.body
  // console.log(req.body)
  var string = JSON.stringify(datas);
  var objectValue = JSON.parse(string);

  college=objectValue['clg'];
  branch=objectValue['clg_branch'];
  batch=objectValue['clg_batch'];
  division=objectValue['clg_div'];
  date=objectValue['clg_date'];
  end_date=objectValue['clg_end_time'];
  start_date=objectValue['clg_start_date'];

  values =[
    [college,branch,division,batch]
  ]
  let MetaId;

     // let metaId =connection.query(' SELECT id FROM excel_meta_data WHERE college_name = ? AND branch = ? AND division = ? AND batch = ? ', [college,branch,division,batch]);
      MetaId=connection.query(
        'SELECT id FROM excel_meta_data WHERE college_name = ? AND branch = ? AND division = ? AND batch = ?',[ college,branch,division,batch], 
        function (err, result) {
          if (err) throw err;
          lastid=result.id
          var string = JSON.stringify(result);
          var objectValue = JSON.parse(string);
          console.log(result)
          metaId=result[0].id

          // console.log("Meta ID"+metaId)
           console.log(result)
          // console.log(lastid)
          if(result.length>0)
          {
              console.log("Data Readed")
              connection.query(
                'SELECT * FROM students WHERE excel_meta_id = ?',[metaId], 
                function (err, studentresult) {
                  if (err) throw err;
                  // console.log(studentresult)
                  if(studentresult.length>0)
                  {
                    res.send(JSON.stringify(studentresult));
                  }
                  else
                  {
                    res.status(500).send({
                      message: "Not Found!",
                  
                    });
                  }
                
                
            
                });
              
  
                let list =  connection.query('SELECT * FROM students WHERE excel_meta_id = ? ', [metaId]);
                let studentList = null;
                if( list.length > 0 ){
                     studentList = list;
                    //  console.log(list)
                    //  res.send(JSON.stringify(studentList));
                }
                else{
                     studentList = [];
                }
                let msg = 'id found in excel_meta_info table';
                let result = JSON.parse(JSON.stringify(metaId));
                let id = result.id;
                return {msg, metaId, studentList};
          }
          else{
              let msg = 'id not found in excel_meta_info table';
              // console.log(msg)
              return {msg };
          }

        }
      );    
  });

app.post('/mark_attendance',function(req,res){

  datas=req.body
  console.log('-----------------response---------------')
  console.log(datas)
  console.log('-----------------response---------------')
  college_name  =  datas.clg_nm;
  branch  =  datas.branch;
  division  =  datas.division;
  lecture_date  =  datas.lecture_date;
  batch  =  datas.batch;
  start_date  =  datas.start_time;
  meta_ids  =  datas.excel_meta_id;

  let resultQuery;

  let jsonData = JSON.stringify( datas);
  let result = Object.entries(datas)

 

    const nameArray = [];
    const prnArray = [];
    const mobileArray = [];
    const metaArray = [];
    const attendanceArray = [];

    for( let i = 0; i < result.length; i++){
      const [ key, value ] = result[i];

      if(  key.includes("prn") ){
          prnArray.push(value);
      }

      if(  key.includes("mobile") ){
          mobileArray.push(value);
      }

      if(  key.includes("name") ){
          nameArray.push(value);
      }

      if(  key.includes("attendance") ){
          attendanceArray.push(value);
      }

      if( i % 4 == 0 ){
            console.log('----------------------------------')
        }
        console.log('key = ' + key + ' value = ' + value)
      
  }

  for( let i = 0; i < prnArray .length; i++ ){
    let name = nameArray[i];
    let mobile = mobileArray[i];
    let prn = prnArray[i];
    let attendance = attendanceArray[i];
   
    console.log('name = '+ name+' Mobile ='+mobile+ 'prn'+prn+'attendance'+attendance )

    resultQuery = connection.query('INSERT INTO attendances (`excel_meta_ids`, `college`, `branch`, `division`, `batch`, `date`, `start_time`, `prn`, `student_name`, `mobile`, `attendance`) VALUES ( ?,?,?,?,?,?,?,?,?,?,?)', 
    [meta_ids,college_name,branch,division,batch,lecture_date,start_date,prn,name, mobile,attendance]); 
  }

  res.send({
    message: "Attendance Added Successfully.",
  
    });
  let message = 'Error in creating student record';

  if(resultQuery >0){
      res.send({
      message: "Attendance Added Successfully.",
    
      });
  }
  else
  {
    res.status(500).send({
      message: "Error While submitting.",
  
    });
  }

  
     return {message};
});

app.post('/trainerlogin',function(req,res){

datas=req.body;
username=datas.username;
password=datas.password;
console.log(username)
console.log(password)
  // if (err) throw err;
  //Select all customers and return the result object:
  MetaId=connection.query('SELECT * FROM trainer WHERE username = ? AND password = ?',[ username,password], 
  function (err, result) {  
  if (err) throw err;
    res.send(JSON.stringify(result));
    console.log(JSON.stringify(result));
  });


});

app.post('/adminlogin',function(req,res){

  datas=req.body;
  username=datas.username;
  password=datas.password;
  console.log(username)
  console.log(password)
    // if (err) throw err;
    //Select all customers and return the result object:
    MetaId=connection.query('SELECT * FROM admin WHERE username = ? AND password = ?',[ username,password], 
    function (err, result) {  
    if (err) throw err;
      res.send(JSON.stringify(result));
      console.log(JSON.stringify(result));
    });
  
  
  });
 
 

app.get('/download',function(req,res){

  // datas=req.body
  // college=datas.college;
  // branch=datas.branch;
  // div=datas.division;
  // batch=datas.batch;
  // start_date=datas.start_date;
  // start_date=datas.end_date;
  MetaId=connection.query(
    'SELECT * FROM attendances', 
    function (err, result) {
      if (err) throw err;
      lastid=result.id
      var string = JSON.stringify(result);
      res.send(JSON.stringify(result));
    });
  // datas=req.body
  // console.log('-----------------response---------------')
  // console.log(datas)
  // console.log('-----------------response---------------')

  // if (err) throw err;
  //     //Select all customers and return the result object:
  //     connection.query("SELECT branch FROM attendance", function (err, result, fields) {
  //       if (err) throw err;
  //       res.send(JSON.stringify(result));
  //       console.log(JSON.stringify(result));
  //     });
  // ATTENDANCE.findAll().then((objs) => {
  //   let attendance = [];

  //   objs.forEach((obj) => {
  //     attendance.push({
  //     //   id: obj.id,
  //       COLLEGE:obj.COLLEGE,
  //       PRN: obj.PRN,
  //       BRANCH:obj.BRANCH,
  //       DIVISION:obj.DIVISION,
  //       Date:obj.Date,
  //       start_time:obj.START_TIME,
  //       STUDENT_NAME: obj.STUDENT_NAME,
  //       MOBILE: obj.MOBILE,
  //       ATTENDANCE: obj.ATTENDANCE,
  //       created_at:obj.createdAt,
  //       updated_at:obj.updatedAt
  //     });
  //   });

  //   let workbook = new excel.Workbook();
  //   let worksheet = workbook.addWorksheet("Attendance");

  //   worksheet.columns = [
  //     // { header: "Id", key: "id", width: 5 },
  //     { header: "COLLEGE", key: "COLLEGE", width: 25 },
  //     { header: "PRN", key: "PRN", width: 25 },
  //     { header: "BRANCH", key: "BRANCH", width: 25 },
  //     { header: "DIVISION", key: "DIVISION", width: 25 },
  //     { header: "LECTURE_Date", key: "Date", width: 25 },
  //     { header: "STUDENT_NAME", key: "STUDENT_NAME", width: 25 },
  //     { header: "START_TIME", key: "START_TIME", width: 10 },
  //     { header: "MOBILE_NUMBER", key: "MOBILE", width: 10 },
  //     { header: "ATTENDANCE", key: "ATTENDANCE", width: 10 },
  //   ];

  //   // Add Array Rows
  //   worksheet.addRows(attendance);

   

  //   res.setHeader(
  //     "Content-Type",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   );
  //   res.setHeader(
  //     "Content-Disposition",
  //     "attachment; filename=" + "tutorials.xlsx"
  //   );
  //   //   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //   // res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  //   // res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');

  //   // workbook.xlsx.write(res);
  //   // res.end()

  //   return workbook.xlsx.write(res).then(function () {
  //     res.status(200).end();
  //     // res.download();
  //   });
  // });
});

app.get('adminlogout',function(req,res){


});




    





 
  // ATTENDANCE.bulkCreate(items)
  // .then(() => {
  //   res.status(200).send({
  //     message: "Bunch of students created successfully: " + req.file.originalname,
  //   });
  // })
  // .catch((error) => {
  //   res.status(500).send({
  //     message: "Failed To Insert!",
  //     error: error.message,
  //   });

  // });




// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

