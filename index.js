import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.render('ind.ejs');
    console.log("Website loaded succesfully");
})

app.post('/submit', (req, res)=>{
    console.log("buttonworks");
})