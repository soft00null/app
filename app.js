

"use strict";

// access token for your app (copy from DevX getting started page)
const token = "EAAH2yAzd7coBAOoCkyhhOCuqZB0tqtgy1ZAgknjDK9eFb93QYkOI1TXIzLwODVxV47nezU2rZBfODlPcsLa91xxvxkgQZBAlwG9xzkqCILavqtbXkkPNIWw3SwUTUzoorj7sjg8SIKX4dLEpmMKqx5TGUSo9BHEx4WYZAkyxqFZCXVpvkE4NcZC";

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server

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
      
      if (msg_body == "checkin:0009")
        {
                         
          
          // Add to google sheet code start
          var sheetdb = require('sheetdb-node');
         
          // create a config file
          var config = {
            address: '0kzd0o37r10g4',
          };

          // Create new client
          var client = sheetdb(config);
          
          client.endpoint('count').then(function(data) { // count total no of rows
          console.log(data);
          var jsonParsed = JSON.parse(data);
          console.log(jsonParsed.rows);
          var index = jsonParsed.rows + 1; //get index 
          var visit_token = 1000 + jsonParsed.rows; // token number 
          
          // get current date and time
          var datetime = new Date();
          
          let intlDateObj = new Intl.DateTimeFormat('en-US', {
               timeZone: "Asia/Kolkata",
               dateStyle: 'full', 
               timeStyle: 'full'
           });
          let date = new Intl.DateTimeFormat('en-US', {
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
                "caption": "Hello "+from_name+", Welcome to our store! Your token number is: "+visit_token+" & Check in time is "+indiaTime,
                "link": "https://bwipjs-api.metafloor.com/?bcid=ultracode&text=1234567890"},
            //"link": "https://i.ibb.co/hff1hmb/chitle.png"}, //Send image in WhatsApp reply

          },
          headers: { "Content-Type": "application/json" },
          }); //End of WhatsApp reply

             // End of date and time module
             // Adds single row
              client.create({ Index: index, Token: visit_token, Name: from_name, Phone: from, Date: indiaDate , Time: indiaTime }, "Store A").then(function(data) {
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
      else if (msg_body == "checkin:khsc0009")
        {
           axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url: "https://graph.facebook.com/v12.0/" + phone_number_id + "/messages?access_token=" + token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          //text: { body: "hello: " + msg_body },
          //Send image 
          "type": "image",
          "image": {
              "caption": "Hello "+from_name+", Welcome to Kaka halwai sweet center!",
              "link": "https://i.ibb.co/Lk5gBFX/Kaka-halwai.png"},
          //
          
        },
        headers: { "Content-Type": "application/json" },
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
