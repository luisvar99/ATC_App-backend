const {db} = require('../database');

const addRondas = async (req, res) => {
    
    const nombre_ronda = req.body.nombre_ronda 

    try {
        const result = await db.query('INSERT INTO rondas (nombre) VALUES ($1) RETURNING *', [
            nombre_ronda,  
        ]);
        res.json({result: result.rows[0], success:true});
    } catch (error) {
        res.json({result: result.rows[0], success:false});
        console.log(error.message);
    }
}
const UpdateRondas = async (req, res) => {
    
    const nombre_ronda = req.body.nombre_ronda;
    const id_ronda = req.params.id_ronda;

    try {
        const result = await db.query('UPDATE rondas set nombre=$1 WHERE id_ronda = $2 RETURNING *', [
            nombre_ronda, id_ronda 
        ]);
        res.json({result: result.rows[0], success:true});
    } catch (error) {
        res.json({result: result.rows[0], success:false});
        console.log(error.message);
    }
}

const DeleteRondas = async (req, res) => {

    const id_ronda = req.params.id_ronda;

    try {
        const result = await db.query('DELETE from rondas WHERE id_ronda = $1 RETURNING *', [
            id_ronda
        ]);
        res.json({result: result.rows[0], success:true});
    } catch (error) {
        res.json({result: result.rows[0], success:false});
        console.log(error.message);
    }
}


const getAllrondas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM rondas order by nombre');
        //console.log("Rondas : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetRondasById = async (req, res) => {
    const id_ronda = req.params.id_ronda;
    //console.log(JSON.stringify(id));
    try {
        const result = await db.query('SELECT * FROM rondas WHERE id_ronda = $1 ' , 
        [id_ronda]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addRondas, 
    GetRondasById, UpdateRondas, 
    DeleteRondas, getAllrondas
}