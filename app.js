var sheetdb = require('sheetdb-node');

// create a config file
var config = {
  address: '0kzd0o37r10g4',
};

// Create new client
var client = sheetdb(config);

// Adds single row
client.create({ Index: 1, Token: 1001, Name: "Mahesh", Phone: 9876543210 }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});


