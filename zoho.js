var axios = require('axios');
var data = '';


var centre = "Headquarter"; // Fetch centre from from MSG_BODY 

var config = {
  method: 'get',
  url: 'https://creator.zoho.in/api/v2/chatbot1234/test/report/'+centre+'_Checkin',
  headers: { 
    'Authorization': 'Zoho-oauthtoken 1000.60bb258dc12e258e85773545948c1b0a.27afcb96e24b78256912620e2a478cc4', 
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
