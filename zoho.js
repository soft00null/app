var axios = require('axios');
var data = '';

var msg = "Checkin:HQ"; //Fetched from whatsapp

var centre = msg.split(':'); // Split Checkin and HQ 

var centre_name = centre[1] ;  // Return HQ


var config = {
  method: 'get',
  url: 'https://creator.zoho.in/api/v2/chatbot1234/test/report/'+centre_name+'_Checkin',
  headers: { 
    'Authorization': 'Zoho-oauthtoken 1000.d332b5f00834aea639ae43a36670079a.92ff3009d2d13f7835faf453dce0e68b', 
    'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=024af6fc-58a3-4e14-897b-ca50bf560c07; fa8dd4bb5a=3494010c8cb824229e44a51a4dce0868; zccpn=024af6fc-58a3-4e14-897b-ca50bf560c07'
  },
  data : data
};

axios(config).then(function (response) {
  
  var d = JSON.stringify(response.data);
  
  var jsonObj = JSON.parse(d); //Fetch Object
  console.log(jsonObj.code);
  
      var count = Object.keys(jsonObj.data).length; //Count length of total entries in Centre
      console.log(jsonObj.data);
    
  
  console.log(count);
})
.catch(function (error) {

  console.log(error);
  
});
