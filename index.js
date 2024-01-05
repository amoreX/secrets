import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import mongoose from 'mongoose'; 
import { MongoClient, ServerApiVersion } from 'mongodb';  

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const password = encodeURIComponent("mdnihalrahman@2005");
let uri = "mongodb+srv://nihal:" + password + "@cluster0.yw0ab49.mongodb.net/secretsforall?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {      //basically checks connection
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

connectToDatabase();


// const SecretSchema = new mongoose.Schema({     
//     name:{
//       type:String,
//       required:true,      // lode ka documenntation
//       trim:true,
//     }
//   });

// const Secret = mongoose.model('secrets',SecretSchema);


app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');     

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.render('ind.ejs',{rees:" "});
    console.log("Website loaded succesfully");
})

app.post('/submit', async(req, res)=>{
  
  const secretgiven = req.body['secret'];
  try {
    // await Secret.create({ name: secretgiven });
    const result = await client.db().collection('secrets').insertOne({ name: secretgiven });

    console.log('Secret saved successfully.');
    res.redirect('/');
  } catch (error) {
    console.error('Error saving secret:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/gen', async(req, res)=>{
    const randomSecret = await client.db().collection('secrets').aggregate([{ $sample: { size: 1 } }]).toArray();
    let ss = randomSecret[0].name;
    res.render('ind.ejs',{rees:ss});
})