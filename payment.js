var axios = require('axios');

var data = JSON.stringify({
  "amount": 1000,
  "currency": "INR",
  "accept_partial": false,
  "expire_by": 1691097057,
  "reference_id": "TS787800876", //chnage this every time
  "description": "Payment for bill ID #23456",
  "customer": {
    "name": "Gaurav Kumar",
    "contact": "+917028164099",
    "email": ""
  },
  "notify": {
    "sms": false,
    "email": false
  },
  "reminder_enable": true,
  "callback_url": "https://example-callback-url.com/",
  "callback_method": "get"
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
