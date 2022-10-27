const {db} = require('../database');

const addTorneo = async (req, res) => {
    console.log(req.body);
    const name = req.body.nombre_torneo
    const fecha_inicio = req.body.fecha_inicio
    const fecha_fin = req.body.fecha_fin
    const fecha_inicio_inscripcion = req.body.fecha_inicio_inscripcion
    const fecha_fin_inscripcion= req.body.fecha_fin_inscripcion
    const id_categoria = req.body.id_categoria
    const descripcion = req.body.descripcion

    try {
        const result = await db.query('INSERT INTO torneos(nombre_torneo, fecha_inicio, fecha_fin, fecha_inicio_inscripcion, fecha_fin_inscripcion, id_categoria, descripcion) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [
            name,  fecha_inicio, fecha_fin, fecha_inicio_inscripcion,fecha_fin_inscripcion, id_categoria, descripcion
        ]);
        //res.json(result.rows);
        res.json({success: true});	
       
    } catch (error) {
        console.log(error.message);
        res.json({success: false});
    }
}
const UpdateTorneo = async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const name = req.body.nombre_torneo
    const fecha_inicio = req.body.fecha_inicio
    const fecha_fin = req.body.fecha_fin
    const fecha_inicio_inscripcion = req.body.fecha_inicio_inscripcion
    const fecha_fin_inscripcion= req.body.fecha_fin_inscripcion
    const id_categoria = req.body.id_categoria
    const descripcion = req.body.descripcion

    const id_torneo = req.params.idTorneo

    try {
        const result = await db.query('UPDATE torneos SET nombre_torneo=$1, fecha_inicio=$2, fecha_fin=$3, fecha_inicio_inscripcion=$4, fecha_fin_inscripcion=$5, id_categoria=$6, descripcion=$7 WHERE id_torneo=$8 RETURNING *', [
            name,  fecha_inicio, fecha_fin, fecha_inicio_inscripcion,fecha_fin_inscripcion, id_categoria, descripcion, id_torneo
        ]);
        //console.log(result);
        res.json(result.rows);
        //res.json({success: true});
    } catch (error) {
        res.json({success: error.message});
        console.log(error.message);
    }
}

const DeleteTorneo = async (req, res) => {

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

const GetAllTorneos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM torneos where fecha_fin > CURRENT_DATE ');
        console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetTorneoById = async (req, res) => {
    const id = req.params.idTorneo;
    console.log(JSON.stringify(id));
    try {
        const result = await db.query('SELECT * FROM torneos WHERE id_torneo = $1 ' , 
        [id]);
        console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addTorneo, GetAllTorneos, 
    GetTorneoById, UpdateTorneo, 
    DeleteTorneo
}