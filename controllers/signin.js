

const signinhandle = (req , res , db , bcrypt) => {
    const {email , password} = req.body;
    if( !email || !password){
        return res.json('error!');
    }
    db.select('email' , 'hash').from('login').where('email' , '=' , email)
    .then(data=>{
        const isvalid = bcrypt.compareSync(password, data[0].hash);
        if(isvalid){
            return db.select('*').from('users').where('email' , '=' , email)
            .then(users => {
                res.json(users[0])
            })
            .catch(err=>{
                res.status(400).json('wrong username and password ');
            })
        } else{
            res.status(400).json('username and password didnt match');
        }
    })
    .catch(err=>{
        res.status(400).json("username and password didnt match");
    }) 
}

export default {signinhandle : signinhandle};