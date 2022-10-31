const {db} = require('../database');

const addSubTorneo = async (req, res) => {
    console.log(req.body);
    const id_torneo = req.body.id_torneo
    const name = req.body.nombre
    const cantidad_personas = req.body.cantidad_personas

    try {
        const result = await db.query('INSERT INTO subtorneos(id_torneo,nombre,cantidad_personas ) VALUES ($1,$2,$3) RETURNING *', [
            id_torneo,  name, cantidad_personas,
        ]);
        //res.json(result.rows);
        res.json({success: true});	
       
    } catch (error) {
        console.log(error.message);
        res.json({success: false});
    }
}
const UpdateSubTorneo = async (req, res) => {
    //console.log(req.body)
    //console.log(req.params)
    const name = req.body.nombre_SubTorneo
    const fecha_inicio = req.body.fecha_inicio
    const fecha_fin = req.body.fecha_fin
    const fecha_inicio_inscripcion = req.body.fecha_inicio_inscripcion
    const fecha_fin_inscripcion= req.body.fecha_fin_inscripcion
    const id_categoria = req.body.id_categoria
    const descripcion = req.body.descripcion

    const id_SubTorneo = req.params.idSubTorneo

    try {
        const result = await db.query('UPDATE subtorneos SET nombre_subTorneo=$1, fecha_inicio=$2, fecha_fin=$3, fecha_inicio_inscripcion=$4, fecha_fin_inscripcion=$5, id_categoria=$6, descripcion=$7 WHERE id_SubTorneo=$8 RETURNING *', [
            name,  fecha_inicio, fecha_fin, fecha_inicio_inscripcion,fecha_fin_inscripcion, id_categoria, descripcion, id_SubTorneo
        ]);
        //console.log(result);
        res.json(result.rows);
        //res.json({success: true});
    } catch (error) {
        res.json({success: error.message});
        console.log(error.message);
    }
}

const DeleteSubTorneo = async (req, res) => {

    const id_SubTorneo = req.params.idSubTorneo;

    try {
        const result = await db.query('DELETE from subtorneos WHERE id_SubTorneo = $1 RETURNING *', [
            id_SubTorneo
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const GetSubTorneoById = async (req, res) => {
    const id = req.params.idTorneo;
    //console.log(JSON.stringify(id));
    try {
        const result = await db.query('SELECT * FROM subtorneos WHERE id_torneo = $1 ' , 
        [id]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetSubTorneosByTorneoId = async (req, res) => {
    const id = (req.params.idTorneo);
    //console.log(id);
    try {
        const result = await db.query('SELECT * FROM subtorneos WHERE id_torneo = $1 ' , 
        [id]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}
const GetSingleSubTorneo = async (req, res) => {
    const id = req.params.idSubTorneo;
    console.log("GetSingleSubTorneo " + id);
    try {
        const result = await db.query('SELECT * FROM subtorneos WHERE id_subtorneo = $1 ' , 
        [id]);
        console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetSubTorneosParticipants = async (req, res) => {
    const id = (req.params.idSubTorneo);
    //console.log(id);
    try {
        const result = await db.query(`SELECT st.nombre, tor.nombre_torneo, u.username, u.id
        FROM subtorneos st
        JOIN participantestorneo pt on pt.id_subtorneo = st.id_subtorneo
        JOIN torneos tor on tor.id_torneo = st.id_torneo
        JOIN users u on u.id = pt.user_id
        WHERE st.id_subtorneo =  $1` , 
        [id]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}
const GetNumberOfParticipants = async (req, res) => {
    const id = (req.params.idSubTorneo);
    //console.log("GetNumberOfParticipants: " + id);
    try {
        const result = await db.query("SELECT COUNT(*) number_of_participants FROM participantestorneo WHERE id_subtorneo = $1" , 
        [id]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    addSubTorneo, 
    GetSubTorneosByTorneoId, UpdateSubTorneo, 
    DeleteSubTorneo, GetSubTorneoById, GetSubTorneosParticipants,
    GetNumberOfParticipants, GetSingleSubTorneo
}