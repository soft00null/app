var axios = require('axios');

var data = JSON.stringify({
  "amount": 1000,
"currency": "INR",
"accept_partial": false,
"expire_by": 1691097057,
"reference_id": "TQUU876",
"description": "Payment for bill ID #23456",
"customer": {
"name": "Riya Shah",
"contact": "+917028164099"
}
});

var config = {
  method: 'post',
  url: 'https://api.razorpay.com/v1/payment_links',
  headers: { 
    'Authorization': 'Basic cnpwX2xpdmVfbGpuWFBvNmlrRHl5YU86STUxSk5ENk8xU1cwRTdCM1lGbGNLMVFY', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  
  //console.log(JSON.stringify(response.data));
  
  var d = JSON.stringify(response.data);
  
  var jsonObj = JSON.parse(d); //Fetch Object
  console.log(jsonObj);
  
  console.log(jsonObj.short_url);  //Payment link
  
})
.catch(function (error) {
  console.log(error);
});
