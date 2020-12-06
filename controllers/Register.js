

const handleregister =  (req , res ,db , bcrypt) => {
    const {name , email , password } = req.body;
    if(!name || !email || !password){
        return res.json('error!');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash : hash,
            email : email
        })
        .into('login')
        .returning('email')
        .then(loginemail => {
            
           return trx('users')
                    .returning('*')
                    .insert({
                        name : name ,
                        email : loginemail[0] ,
                        joined : new Date()
                })
                    .then(user =>{
                        res.json(user[0])
                })
                    
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>{
        res.status(400).json('error');
    })
    
    
}


export default {handleregister : handleregister};