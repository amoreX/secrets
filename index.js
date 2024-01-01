import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import mongoose from 'mongoose'; 

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect('mongodb://localhost:27017/secret', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const SecretModel = mongoose.model('Secret', {      //defiens the model according to whch the data inptted will be stored
    secret: String,
  });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');     

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.render('ind.ejs');
    console.log("Website loaded succesfully");
})

app.post('/submit', async(req, res)=>{
    console.log("buttonworks");
    const { secret } = req.body;     //stores the input body in secret

  // Create a new document using the mongoose model
  const newSecret = new SecretModel({secret,});        //newsecret stores the document which is modeleed above and t's a concise way to define an object where the property name and the variable name are the same
    await newSecret.save();
    console.log('Secret added successfully');
    res.redirect('/');

})
app.post('/gen', async(req, res)=>{
    const randomSecret = await SecretModel.aggregate([{ $sample: { size: 1 } }]);
    res.locals.randomSecret = randomSecret[0].secret;
    res.render('ind.ejs');
})