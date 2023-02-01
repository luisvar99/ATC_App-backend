const {db} = require('../database');

const addHorario = async (req, res) => {
    const inicio = req.body.inicio 
    console.log("inicio: " + inicio);
    const fin = req.body.fin
    console.log("fin: " + fin);
    const hora_inicio = req.body.hora_inicio
    console.log("hora_inicio: " + hora_inicio);

    
    const estatus_horario = req.body.estatus_horario
    

    try {
        const result = await db.query('INSERT INTO horarioscancha (inicio, fin, hora_inicio ,estatus_horario) VALUES ($1,$2,$3,$4) RETURNING *', [
            inicio,  fin, hora_inicio, estatus_horario
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
    const client =  await db.connect()
    try {
        const result = await db.query('SELECT * FROM horarioscancha order by inicio');
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
        
    } catch (error) {
        console.log(error.message);
    }finally{
        client.end();
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