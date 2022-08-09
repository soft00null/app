var sheetdb = require('sheetdb-node');

 var datetime = new Date();

   var date = datetime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    var time = datetime.toLocaleTimeString('en-US', {
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });


// create a config file
var config = {
  address: '0kzd0o37r10g4',
};

// Create new client
var client = sheetdb(config);

// Adds single row
client.create({ Index: 1, Token: 1001, Name: "Mahesh", Phone: 9876543210, Date: date , Time: time }, "Store A").then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});


// Adds single row to worksheet named "date"
//client.create({ Index: 1, Token: 1001, Name: "Mahesh", Phone: 9876543210, Date: date , Time: time}, "Store B").then(function(data) {
//  console.log(data);
//}, function(err){
//  console.log(err);
//});