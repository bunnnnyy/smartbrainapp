

const profile = ( (req , res ,db)=>{
    const { id } = req.params;
    db.select('*').from('users').where({id:id})
    .then(users=>{
        if(users.length){
            res.json(users[0]);
        }else{
            res.json('error');
        } 
    })
    .catch(err =>{
        res.status(400).json('error');
    })
} 
)

export default {profile : profile};