

"use strict";

// access token for your app (copy from DevX getting started page)
const token = "EAAH2yAzd7coBAOoCkyhhOCuqZB0tqtgy1ZAgknjDK9eFb93QYkOI1TXIzLwODVxV47nezU2rZBfODlPcsLa91xxvxkgQZBAlwG9xzkqCILavqtbXkkPNIWw3SwUTUzoorj7sjg8SIKX4dLEpmMKqx5TGUSo9BHEx4WYZAkyxqFZCXVpvkE4NcZC";

//zoho token

const access_token = "1000.fa9eb592d980d280df993ee36ee6f9c1.801108acc6d6362dd26b07e0af8c127a";

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server



// get current date and time
          var datetime = new Date();
          
          let intlDateObj = new Intl.DateTimeFormat('en-GB', {
               timeZone: "Asia/Kolkata",
               dateStyle: 'full', 
               timeStyle: 'full'
           });
          let date = new Intl.DateTimeFormat('en-GB', {
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


// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  // Validate the webhook
  if (req.body.object) {
    if (
      req.body.entry && req.body.entry[0].changes && req.body.entry[0].changes[0] && req.body.entry[0].changes[0].value.messages && req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let from_name = req.body.entry[0].changes[0].value.contacts[0].profile.name; // extract the phone number from the webhook payload
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      
      if (msg_body == "Checkin:khsc0009" )
        {
                         
          
          // Add to google sheet code start
          var sheetdb = require('sheetdb-node');
         
          // create a config file
          var config = {
            address: '0kzd0o37r10g4',
          };
          
          // Create new client
          var client = sheetdb(config);
          
          //const cli = sheetdb({ address: '0kzd0o37r10g4', sheet: 'HQ' }); //Get count from sheet HQ
          
          client.endpoint('count').then(function(data) { // count total no of rows
          console.log(data);
          var jsonParsed = JSON.parse(data);
          console.log(jsonParsed.rows);
          var index = jsonParsed.rows + 1; //get index 
          var visit_token = 123400001 + jsonParsed.rows; // token number 
          
          
            
          //Send WhatsApp reply  
          axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url: "https://graph.facebook.com/v12.0/" + phone_number_id + "/messages?access_token=" +token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            //text: { body: "hello: " + msg_body },
            //Send image 
            "type": "image",
            "image": {
                "caption": "Hello "+from_name+", Welcome to Simira Diagnostics! Your token number is: "+visit_token+" & Check in time is "+indiaTime,
                "link": "https://simiradiagnostics.com/wp-content/themes/horizondiagnostic/images/popup.jpeg"},
            //"link": "https://i.ibb.co/hff1hmb/chitle.png"}, //Send image in WhatsApp reply
            //https://bwipjs-api.metafloor.com/?bcid=code128&text="+visit_token+"&scale=3&rotate=N&includetext&backgroundcolor=FFFFFF

          },
          headers: { "Content-Type": "application/json" },
          }); //End of WhatsApp reply

             // End of date and time module
             // Adds single row
              client.create({ Index: index, Token: visit_token, Name: from_name, Phone: from, Date: indiaDate , Time: indiaTime }, "HQ").then(function(data) {
                console.log(data);
              }, function(err){
                console.log(err);
              });          
           //Count total rows in sheet
            
          }, function(error){
              console.log(error);
          })

         

          // End of google sheet code
          
        }
      else if (msg_body == "Checkin:HQ" || msg_body == "Checkin:kamothe" )
        {
          
          var rest_data = '';

          //var msg = "Checkin:HQ"; //Fetched from whatsapp

          var centre = msg_body.split(':'); // Split Checkin and HQ 

          var centre_name = centre[1] ;  // Return HQ
          
          var Token_config = {
                              method: 'get',
                              url: 'https://creator.zoho.in/api/v2/chatbot1234/test/report/'+centre_name+'_Checkin',
                              headers: { 
                                        'Authorization': 'Zoho-oauthtoken '+access_token+'', 
                                        'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=024af6fc-58a3-4e14-897b-ca50bf560c07; fa8dd4bb5a=3494010c8cb824229e44a51a4dce0868; zccpn=024af6fc-58a3-4e14-897b-ca50bf560c07'
                                       },
                              data : rest_data
                              };

          axios(Token_config)
            .then(function (response) 
                  {
                  var d = JSON.stringify(response.data);
  
                  var jsonObj = JSON.parse(d); //Fetch Object
                  console.log(jsonObj.data);
             
                 
                    var count = Object.keys(jsonObj.data).length; //Count length of total entries in Centre
                    console.log(jsonObj.data);
                    var token_no = count + 90001; //Set the Token number
                
                  
                  
            
            //WhatsApp message send 
             axios({
                  method: "POST", // Required, HTTP method, a string, e.g. POST, GET
                  url: "https://graph.facebook.com/v12.0/" + phone_number_id + "/messages?access_token=" + token,
                  data: {
                          messaging_product: "whatsapp",
                          to: from,
                          "type": "image",
                          "image": {
                          "caption": "Hello "+from_name+", Welcome to Simira Diagnostics! Token :"+token_no+", Date:"+indiaDate+", Time:"+indiaTime,
                          "link": "https://simiradiagnostics.com/wp-content/themes/horizondiagnostic/images/popup.jpeg"},         
                        },
                  headers: { "Content-Type": "application/json" },
                });
            
            //Add data to zoho 
            
            var config = {
                          method: 'post',
                          url: 'https://creator.zoho.in/api/v2/chatbot1234/test/form/'+centre_name+'',
                          headers: { 
                            'Authorization': 'Zoho-oauthtoken '+access_token+'', 
                            'Content-Type': 'text/plain', 
                            'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=024af6fc-58a3-4e14-897b-ca50bf560c07; fa8dd4bb5a=3494010c8cb824229e44a51a4dce0868; zccpn=024af6fc-58a3-4e14-897b-ca50bf560c07'
                          },
                          data : {
                          "data": {

                              "Date_field" : indiaDate,
                              "Time" : indiaTime,
                              "Token" : token_no,
                              "Name" : from_name,
                              "WhatsApp" : from
                                  }
                                }
                          };

                          axios(config)
                          .then(function (response) {
                            console.log(JSON.stringify(response.data));
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
            
                  })
          .catch(function (error) 
                 {
                  console.log(error);
                 });
          
          
          
          
          
        }
      else
        {
           axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url: "https://graph.facebook.com/v12.0/" + phone_number_id + "/messages?access_token=" + token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          //text: { body: "ack: " +msg_body }, //msg_body
          text: { body: "Hello "+from_name+", Kindly scan valid QR code!"},
        },
        headers: { "Content-Type": "application/json" },
      });
        }
      
     
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a whatsApp API
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
app.get("/webhook", (req, res) => {
  /** UPDATE YOUR VERIFY TOKEN
  This will be the Verify Token value when you set up webhook**/
  const VERIFY_TOKEN = "blue_puppy";

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
