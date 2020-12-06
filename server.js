
import express, { response } from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import register from './controllers/Register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profileid.js';
import * as image from './controllers/images.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'vikas@123',
      database : 'smartbrain'
    }
  });



const app = express();




app.use(express.json());
app.use(cors());




app.post ('/signin' , (req , res)=> {
    signin.signinhandle(req , res , db , bcrypt) 
} )



app.post ('/register' , (req , res)=> {
    register.handleregister(req , res , db , bcrypt) 
})


app.get('/profile/:id' , (req , res)=> {
    profile.profile(req , res , db ) 
})


app.put('/images' , (req , res)=> {
    image.img(req , res , db ) 
})

app.post('/imagesurl' , (req , res)=> {
    image.apihandle(req , res) 
})

app.listen(process.env.PORT || 3000 , () => {
    console.log(`app is running at ${process.env.PORT}`);
} )

// signin - post 
// register -  post

// profile :userid get
// images 
