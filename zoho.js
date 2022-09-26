var axios = require('axios');
var data = '{\n  "data": {\n      "Task_Name" : "Test Name",\n      "Task_Description" : "test Description"\n  }\n}';

var config = {
  method: 'post',
  url: 'https://creator.zoho.in/api/v2/chatbot1234/test/form/Tasks',
  headers: { 
    'Authorization': 'Zoho-oauthtoken 1000.6525f53879668d86e2335c32170771d1.40f54fb63fff66cd26772054d32ed534', 
    'Content-Type': 'text/plain', 
    'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=f1b5e617-ff18-4d0d-a4d5-98fe57b3f56c; fa8dd4bb5a=43d35879bca9282e41a460714e43e113; zccpn=f1b5e617-ff18-4d0d-a4d5-98fe57b3f56c'
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
