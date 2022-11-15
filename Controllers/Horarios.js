const {db} = require('../database');

const addHorario = async (req, res) => {
    
    const name = req.body.nombre_Horario 
    const category = req.body.id_categoriaHorario
    const status = req.body.estatus_Horario
    

    try {
        const result = await db.query('INSERT INTO horarioscancha (nombre_Horario, id_categoriaHorario,estatus_Horario) VALUES ($1,$2,$3) RETURNING *', [
            name,  category, status
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}
const UpdateHorario = async (req, res) => {
    
    const name = req.body.nombre_Horario;
    const category = req.body.id_categoriaHorario;
    const status = req.body.estatus_Horario;
    const id_Horario = req.params.idHorario;

    try {
        const result = await db.query('UPDATE horarioscancha set nombre_Horario=$1, id_categoriaHorario=$2, estatus_Horario=$3 WHERE id_Horario = $4 RETURNING *', [
            name,  category, status, id_Horario
        ]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteHorario = async (req, res) => {

    const id_Horario = req.params.idHorario;

    try {
        const result = await db.query('DELETE from horarioscancha WHERE id_Horario = $1 RETURNING *', [
            id_Horario
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const GetAllHorarios = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM horarioscancha order by inicio');
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetHorarioById = async (req, res) => {
    const id = req.params.idHorario;
    console.log("ID GetHorarioById " + id);
    try {
        const result = await db.query('SELECT * FROM horarioscancha WHERE id_Horario = $1 ' , 
        [id]);
        console.log("RESULT GetHorarioById: " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addHorario, GetAllHorarios, 
    GetHorarioById, UpdateHorario, 
    DeleteHorario
}