const {db} = require('../database');

const addCancha = async (req, res) => {
    
    const name = req.body.nombre_cancha 
    const category = req.body.id_categoriacancha
    const status = req.body.estatus_cancha
    

    try {
        const result = await db.query('INSERT INTO canchas (nombre_cancha, id_categoriacancha,estatus_cancha) VALUES ($1,$2,$3) RETURNING *', [
            name,  category, status
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}
const UpdateCancha = async (req, res) => {
    
    const name = req.body.nombre_cancha;
    const category = req.body.id_categoriacancha;
    const status = req.body.estatus_cancha;
    const id_cancha = req.params.idCancha;

    try {
        const result = await db.query('UPDATE canchas set nombre_cancha=$1, id_categoriacancha=$2, estatus_cancha=$3 WHERE id_cancha = $4 RETURNING *', [
            name,  category, status, id_cancha
        ]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteCancha = async (req, res) => {

    const id_cancha = req.params.idCancha;

    try {
        const result = await db.query('DELETE from canchas WHERE id_cancha = $1 RETURNING *', [
            id_cancha
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const GetAllCanchas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM canchas');
        console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetCanchaById = async (req, res) => {
    const id = req.params.idCancha;
    console.log(JSON.stringify(id));
    try {
        const result = await db.query('SELECT * FROM canchas WHERE id_cancha = $1 ' , 
        [id]);
        console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addCancha, GetAllCanchas, 
    GetCanchaById, UpdateCancha, 
    DeleteCancha
}