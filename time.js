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