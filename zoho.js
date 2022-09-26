var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  url: 'https://creator.zoho.in/api/v2/chatbot1234/test/report/All_Tasks',
  headers: { 
    'Authorization': 'Zoho-oauthtoken 1000.aab0bc76289b0ceadde6b4a8961e7bd9.8d12627cb8fc6681a41a8b2758c5a856', 
    'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=024af6fc-58a3-4e14-897b-ca50bf560c07; fa8dd4bb5a=3494010c8cb824229e44a51a4dce0868; zccpn=024af6fc-58a3-4e14-897b-ca50bf560c07'
  },
  data : data
};

axios(config).then(function (response) {
  var d = JSON.stringify(response.data);
  
  var jsonObj = JSON.parse(d); //Fetch Object
  console.log(jsonObj.data);
  
 var count = Object.keys(jsonObj.data).length; //Count length of total entries in Centre
  console.log(count);
})
.catch(function (error) {
  console.log(error);
});
