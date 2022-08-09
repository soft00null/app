var sheetdb = require('sheetdb-node');

 var datetime = new Date();

   let intlDateObj = new Intl.DateTimeFormat('en-US', {
               timeZone: "Asia/Kolkata",
               dateStyle: 'full', 
               timeStyle: 'full'
           });

 let date1 = new Intl.DateTimeFormat('en-US', {
               timeZone: "Asia/Kolkata",
               dateStyle: 'full' 
               //timeStyle: 'full'
           });
let time1 = new Intl.DateTimeFormat('en-US', {
               timeZone: "Asia/Kolkata",
               //dateStyle: 'full' 
               timeStyle: 'medium'
           });
         
    let indiaDate = date1.format(datetime);
    
    let indiaTime = time1.format(datetime);
          
           console.log('India date: ' + indiaDate);
           console.log('India Time: ' + indiaTime);

  // var date = datetime.toLocaleString('en-US', {
  //   weekday: 'long',
  //    year: 'numeric',
 //     month: 'long',
 //     day: 'numeric'
 //   });

 //   var time = datetime.toLocaleTimeString('en-US', {
  //      hour:   '2-digit',
  //      minute: '2-digit',
  //      second: '2-digit',
  //  });


// create a config file
var config = {
  address: '0kzd0o37r10g4',
};

// Create new client
var client = sheetdb(config);

// Adds single row
client.create({ Index: 1, Token: 1001, Name: "Mahesh", Phone: 9876543210, Date: indiaDate , Time: indiaTime }, "Store A").then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

//count number of rows in sheet

client.endpoint('count').then(function(data) {
    console.log(data);
}, function(error){
    console.log(error);
})

// Adds single row to worksheet named "date"
//client.create({ Index: 1, Token: 1001, Name: "Mahesh", Phone: 9876543210, Date: date , Time: time}, "Store B").then(function(data) {
//  console.log(data);
//}, function(err){
//  console.log(err);
//});