const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

  var datetime = new Date();

   var date = datetime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    var time = datetime.toLocaleTimeString('en-US', {
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    

async function start() {
  
    

    const VisitorRef = db.collection('Visitor').doc(date);

    const doc = await VisitorRef.get();
    
        if (!doc.exists) {
        console.log('No such document!');
        //Count = 1;
        const data = {
            Counter: 1,
            c: {
                Name: 'Vijay More',
                WhatsApp:'9876543210',
                Checkin: time,
                Location:'Colaba',
                Index : 1
              }
          };

          const res = await db.collection('Visitor').doc(date).set(data);

        } else {

        var c = doc.data().Counter + 1; //Increment the counter for todays visitors

        const data = {
            Counter: c,
            c: {
                Name: 'Vijay More',
                WhatsApp:'9876543210',
                Checkin: time,
                Location:'Colaba',
                Index : c
              }
               
          };

        const res = await db.collection('Visitor').doc(date).set(data);

        // add subcollection
        const res1 = await db.collection('Visitor').doc(date).collection('messages').doc('message1').set(data); 
            
        //console.log('Document data:', doc.data());
        
        const collections = await VisitorRef.listCollections();
        collections.forEach(collection => {
          
        console.log('Found subcollection with id:', collection.id); //get sub collection ID
        });

        }
}

start();
