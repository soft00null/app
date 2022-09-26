var axios = require('axios');

var date = "Monday, 26 September 2022";
var time = "1:48:03 PM";
var token = "1";
var name = "Usha"
var whatsapp = "+919873456798"

var data = '{  "data": { "Date" : "Monday, 26 September 2022", "Time" : "1:48:03 PM", "Token" : "900001", "Name" : "Sneha", 
      "WhatsApp" : "+919876543210"
  }
}';

var config = {
  method: 'post',
  url: 'https://creator.zoho.in/api/v2/chatbot1234/test/form/Headquarter',
  headers: { 
    'Authorization': 'Zoho-oauthtoken 1000.4d40e334a611303fcb3f35846080d698.5e3929d198699ebbf84df2c6485c42a2', 
    'Content-Type': 'text/plain', 
    'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=024af6fc-58a3-4e14-897b-ca50bf560c07; fa8dd4bb5a=3494010c8cb824229e44a51a4dce0868; zccpn=024af6fc-58a3-4e14-897b-ca50bf560c07'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
