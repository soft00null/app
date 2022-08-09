var sheetdb = require('sheetdb-node');

 var datetime = new Date();

   let intlDateObj = new Intl.DateTimeFormat('en-US', {
               timeZone: "Asia/Kolkata",
               dateStyle: 'full', 
               timeStyle: 'full'
           });

 let date = new Intl.DateTimeFormat('en-US', {
               timeZone: "Asia/Kolkata",
               dateStyle: 'full' 
               //timeStyle: 'full'
           });
let time = new Intl.DateTimeFormat('en-US', {
               timeZone: "Asia/Kolkata",
               //dateStyle: 'full' 
               timeStyle: 'medium'
           });
         
    let indiaDate = date.format(datetime);
    
    let indiaTime = time.format(datetime);
          
           console.log('India date: ' + indiaDate);
           console.log('India Time: ' + indiaTime);


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
