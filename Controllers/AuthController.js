const {db} = require('../database');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');


const Login = async (req, res) => {
    //console.log(req.session);
    
    const potencialLogin = await db.query("SELECT id, username, passhash, role FROM users WHERE username=$1", 
    [req.body.username])
    
    if(potencialLogin.rowCount>0){
        const isSamePass = await bcrypt.compare(req.body.password, potencialLogin.rows[0].passhash)
        if(isSamePass){
            req.session.user = {
                username:req.body.username,
                id: potencialLogin.rows[0].id
            }
            res.json({loggedIn: true, username: req.body.username, id:potencialLogin.rows[0].id, role: potencialLogin.rows[0].role})
            //console.log("Segundo Session");
            console.log(req.session);
            //console.log("Good Login!");
        }else{
            res.json({loggedIn: false, status: "wrong username or password"})
            console.log("Not good");
        }
    }else{
        console.log("Not good");
        res.json({loggedIn: false, status: "wrong username or password"})
    }
}

const SignUp = async (req, res) => {
    const existingUser = await db.query('SELECT username from users where username = $1',
    [req.body.username])
    if (existingUser.rowCount==0){
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await db.query("INSERT INTO users (username, passhash) VALUES($1,$2) RETURNING id, username",
        [req.body.username, hashedPass]);
        
        console.log(newUserQuery.rows[0]);
        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id
        }
        console.log(newUserQuery.rows[0]);
        res.json({loggedIn:true, username: req.body.username, id:newUserQuery.rows[0].id})

    }else{
        res.json({loggedIn: false, status: "Username taken"});
    }
    
}


module.exports = {
    SignUp,
    Login
}