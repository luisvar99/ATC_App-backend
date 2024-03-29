const {db} = require('../database');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
    console.log("Role " + req.body.role);
    const username = req.body.username;
    const password = req.body.password;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const cedula = req.body.cedula;
    const accion = req.body.accion;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const correo_electronico = req.body.correo_electronico;
    const sexo = req.body.sexo;
    const rol = req.body.role;
    const categoria = req.body.categoria;

    const existingUser = await db.query('SELECT username from users where username = $1',
    [username])

    if (existingUser.rowCount==0){

        const hashedPass = await bcrypt.hash(password, 10);
        const newUserQuery = await db.query("INSERT INTO users (username, passhash, nombres, apellidos, cedula, accion, fecha_nacimiento, correo_electronico, sexo, rol, categoria) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11) RETURNING *",
        [username, hashedPass, nombres, apellidos, cedula, accion, fecha_nacimiento, correo_electronico, sexo, rol, categoria]);
        
        console.log(newUserQuery.rows[0]);
        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id
        }
        console.log(newUserQuery.rows[0]);
        res.json({loggedIn:true, username: req.body.username, id:newUserQuery.rows[0].id})

    }else{
        res.json({loggedIn: false, status: false});
    }
        
    
}
const UpdateUser = async (req, res) => {
    
    const username = req.body.username;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const cedula = req.body.cedula;
    const accion = req.body.accion;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const correo_electronico = req.body.correo_electronico;
    const sexo = req.body.sexo;
    const rol = req.body.role;
    const user_id = req.params.user_id;
    const categoria = req.body.categoria;

    try {
        const result = await db.query(`UPDATE users set username=$1, nombres=$2, apellidos=$3, 
        cedula=$4, accion=$5, fecha_nacimiento=$6, correo_electronico=$7, sexo=$8, rol=$9, categoria = $10
        WHERE id = $11 RETURNING *`, [
            username, nombres, apellidos,cedula , accion,fecha_nacimiento , correo_electronico,sexo, rol, categoria, user_id
        ]);
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
        console.log(error.message);
    }
}

const DeleteUser = async (req, res) => {

    const id_user = req.params.id_user;

    try {
        const result = await db.query('DELETE from users WHERE id = $1 RETURNING *', [
            id_user
        ]);
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
        console.log(error.message);
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users ORDER BY apellidos');
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetUserById = async (req, res) => {
    const id = req.params.user_id;
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1 ' , 
        [id]);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const GetUserByName = async (req, res) => {
    const apellido = req.params.apellido;
    console.log(JSON.stringify(apellido));
    try {
        const result = await db.query('SELECT * FROM users WHERE LOWER(apellidos) LIKE $1 ' , 
        [`%${apellido}%`]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const ChangePassword = async (req, res) => {

    const password = req.body.password;
    const user_id = req.params.user_id;

    const hashedPass = await bcrypt.hash(password, 10);

    console.log((req.body));
    console.log((hashedPass));

    try {
        const result = await db.query(`UPDATE users set passhash = $1
        WHERE id = $2 RETURNING *`, 
        [hashedPass, user_id]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addUser, GetAllUsers, 
    GetUserById, UpdateUser, 
    DeleteUser, GetUserByName,
    ChangePassword
}