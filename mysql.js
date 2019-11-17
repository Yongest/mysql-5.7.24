var express = require('express');
var app = express();
// var mysql      = require('mysql');
// app.get('/test', function(req, res){
    
//     var connection = mysql.createConnection({
//         host     : '127.0.0.1',
//         user     : 'root',
//         password : '112233',
//         database : 'blog'
//       });
      
//       connection.connect();
      
//       connection.query(
//           'SELECT * FROM  user ',
//        function (error, results, fields) {
//         if (error) throw error;
//         console.log('The solution is: ', results);
//         res.json(results);
//       });
      
//       connection.end();
//   });
  
app.get('/collect',function(req,res){
  console.log(req.query);
  
  res.json({
    code:200
  })
})

  app.listen(3000,function(err){
      console.log('start ok !');
      
  });

