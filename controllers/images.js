import Clarifai from 'clarifai';
import { response } from 'express';

const app = new Clarifai.App({
    apiKey: '44141d5ce8eb4435a38d99176a832d0c'
   });

   
const apihandle = (req , res) => {
    app.models.predict("d02b4508df58432fbb84e800597b8959", req.body.input )
    .then(response=>{
        res.json(response);
    })
    .catch(err => {
        res.json('oops!');
    })
}




const img = (req , res ,db)=> {
    const { id } = req.body ;
   db('users').where('id' , '=' , id )
    .increment('score' , 1)
    .returning('score')
    .then(score =>{
        res.json(score[0])
    })
    .catch(err =>{
        res.status(400).json('error');
    })
}


// export default {img : img};
export { apihandle};
export {img};