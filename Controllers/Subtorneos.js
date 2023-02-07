const {db} = require('../database');

const addSubTorneo = async (req, res) => {
    console.log(req.body);
    const id_torneo = req.body.id_torneo
    const name = req.body.nombre
    const cantidad_personas = req.body.cantidad_personas
    const categoria = req.body.categoria

    try {
        const result = await db.query('INSERT INTO subtorneos(id_torneo,nombre,cantidad_personas, categoria ) VALUES ($1,$2,$3,$4) RETURNING *', [
            id_torneo,  name, cantidad_personas,categoria
        ]);
        res.json({result: result.rows[0], success: true});
       
    } catch (error) {
        console.log(error.message);
        res.json({result: result.rows[0], success: false});
    }
}
const UpdateSubTorneo = async (req, res) => {
    //console.log(req.body)
    //console.log(req.params)
    const id_torneo = req.body.id_torneo
    const name = req.body.nombre
    const cantidad_personas = req.body.cantidad_personas
    const categoria = req.body.categoria
    const id_SubTorneo = req.params.idSubTorneo

    try {
        const result = await db.query('UPDATE subtorneos SET id_torneo=$1, nombre=$2, cantidad_personas=$3, categoria = $4 WHERE id_SubTorneo=$5 RETURNING *', [
            id_torneo, name, cantidad_personas, categoria, id_SubTorneo
        ]);
        res.json({result: result.rows[0], success: true});
    } catch (error) {
        res.json({result: result.rows[0], success: false});
        console.log(error.message);
    }
}

const DeleteSubTorneo = async (req, res) => {

    const id_SubTorneo = req.params.idSubTorneo;

    try {
        const result = await db.query('DELETE from subtorneos WHERE id_subtorneo = $1 RETURNING *', [
            id_SubTorneo
        ]);
        res.json({result: result.rows[0], success: true});
    } catch (error) {
        res.json({result: result.rows[0], success: false});
        console.log(error.message);
    }
}

const DeleteSubTorneoParticipant = async (req, res) => {

    console.log(req.params);
    const id_SubTorneo = req.params.idSubTorneo;
    const user_id = req.params.user_id;

    try {
        const result = await db.query('DELETE from participantestorneo WHERE id_subtorneo = $1 AND user_id = $2  RETURNING *', [
            id_SubTorneo, user_id
        ]);
        res.json({result: result.rows[0], success: true});
    } catch (error) {
        res.json({result: result.rows[0], success: false});
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
    //console.log("GetSingleSubTorneo " + id);
    try {
        const result = await db.query(`SELECT subt.nombre, subt.cantidad_personas, 
        subt.id_torneo, tor.modalidad, subt.categoria
        FROM subtorneos subt
        JOIN torneos tor on tor.id_torneo = subt.id_torneo
        WHERE id_subtorneo = $1` , 
        [id]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetSubTorneosParticipants = async (req, res) => {
    const id = (req.params.idSubTorneo);
    //console.log(id);
    try {
        const result = await db.query(`SELECT st.nombre, tor.nombre_torneo, u.username, u.id, pt.id_subtorneo
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
    GetNumberOfParticipants, GetSingleSubTorneo,
    DeleteSubTorneoParticipant
}