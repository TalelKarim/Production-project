const  User =  require("../models/userModel");
const bcrypt = require('bcryptjs');

// the Sign Up functionnality
exports.signUp = (req,res) =>{
    const {username, password}  = req.body;
    bcrypt.hash(password, 12)
    .then(hash => {
        const user = new User({
            username,
            password: hash
        })
    req.session.user = user;
   
    user.save()
    .then(() => res.status(201).json({message: "Utilisateur crée !"}))
    .catch(
        (err) => res.status(404).json({"message" :err.message})
    );
})
   .catch(error => res.status(500).json({ error }));
 }


// The login functionnality
exports.login = (req,res) => {
    const {username , password} = req.body;
    User.findOne({username})
    .then(user => {
        if(!user){
            return res.status(401).json({message : 'paire login/mot de passe incorrect'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({message : 'paire login/mot de passe incorrect'});
            }
             req.session.user= user
             return res.status(200).json({user })
            })
        .catch(error => res.status(500).json({ error }));    
        })
    .catch(error => res.status(500).json({ error }));
    
    }
