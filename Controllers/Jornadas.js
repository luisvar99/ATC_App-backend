const {db} = require('../database');

const AddJornada = async (req, res) => {
    
    const equipo_uno = req.body.equipo_uno 
    const equipo_dos = req.body.equipo_dos 
    const id_ronda = req.body.id_ronda 
    const fecha = req.body.fecha
    const id_torneo = req.body.id_torneo

    try {
        const result = await db.query('INSERT INTO jornadascolores (fecha, id_torneo, equipo_uno, equipo_dos, id_ronda) VALUES ($1,$2,$3,$4,$5) RETURNING *', [
            fecha, id_torneo, equipo_uno, equipo_dos, id_ronda
        ]);
        res.json({result: result.rows[0], success:true});
    } catch (error) {
        res.json({success:false});
        console.log(error.message);
    }
}
const UpdateJornada = async (req, res) => {
    const equipo_uno = req.body.equipo_uno;
    const equipo_dos = req.body.equipo_dos;
    const id_ronda = req.body.id_ronda;
    const fecha = req.body.fecha;
    const id_jornada = req.params.id_jornada;
    console.log(fecha);

    try {
        const result = await db.query(`UPDATE jornadascolores set equipo_uno=$1, equipo_dos=$2, fecha=$3, id_ronda=$4 
        WHERE id_jornada = $5 RETURNING *`, [
            equipo_uno, equipo_dos, fecha, id_ronda,id_jornada 
        ]);
        res.json({success:true, result: result.rows[0]});
    } catch (error) {
        console.log(error.message);
    }
}
const PublishJornadas = async (req, res) => {
    console.log(req.params.id_torneo);
    const ispublicado = req.body.ispublicado;
    const id_torneo = req.params.id_torneo;

    try {
        const result = await db.query(`UPDATE jornadascolores set ispublicado=$1 
        WHERE id_torneo = $2 RETURNING *`, [
            ispublicado,id_torneo 
        ]);
        res.json({success:true});
    } catch (error) {
        console.log(error.message);
        res.json({success:false});
    }
}

const DeleteJornada = async (req, res) => {

    const id_jornada = req.params.id_jornada;

    try {
        const result = await db.query('DELETE from jornadascolores WHERE id_jornada = $1 RETURNING *', [
            id_jornada
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const getJornadas = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM jornadascolores j
        JOIN rondas r ON r.id_ronda = j.id_ronda 
        order by j.fecha`);
        console.log("getJornadas : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const getJornadasForUsers = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM jornadascolores j
        JOIN rondas r ON r.id_ronda = j.id_ronda 
        WHERE j.ispublicado=1
        order by j.fecha`);
        console.log("getJornadas : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const getJornadaById = async (req, res) => {
    const id_jornada = req.params.id_jornada;
    //console.log(JSON.stringify(id));
    try {
        const result = await db.query('SELECT * FROM jornadascolores WHERE id_jornada = $1 ' , 
        [id_jornada]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    AddJornada, 
    getJornadaById, UpdateJornada, 
    DeleteJornada, getJornadas,
    PublishJornadas, getJornadasForUsers
}