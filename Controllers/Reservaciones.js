const {db} = require('../database');

const addReservacion = async (req, res) => {
    
    const name = req.body.nombre_Reservacion 
    const category = req.body.id_categoriaReservacion
    const status = req.body.estatus_Reservacion
    

    try {
        const result = await db.query('INSERT INTO reserva (id_cancha, id_horario, id_socio, fecha) VALUES ($1,$2,$3, $4) RETURNING *', [
            name,  category, status
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}
const UpdateReservacion = async (req, res) => {
    
    const name = req.body.nombre_Reservacion;
    const category = req.body.id_categoriaReservacion;
    const status = req.body.estatus_Reservacion;
    const id_Reservacion = req.params.idReservacion;

    try {
        const result = await db.query('UPDATE reserva set nombre_Reservacion=$1, id_categoriaReservacion=$2, estatus_Reservacion=$3 WHERE id_Reservacion = $4 RETURNING *', [
            name,  category, status, id_Reservacion
        ]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteReservacion = async (req, res) => {

    const id_Reservacion = req.params.idReservacion;

    try {
        const result = await db.query('DELETE from reserva WHERE id_Reservacion = $1 RETURNING *', [
            id_Reservacion
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const GetCanchaReservaciones = async (req, res) => {

    const idCancha = req.params.idCancha

    try {
        const result = await db.query(`SELECT u.id, u.username, h.inicio, h.fin, h.id_horario 
        from users u
        JOIN reserva r on r.id_socio = u.id
        JOIN horarioscancha h on h.id_horario = r.id_horario
        WHERE id_cancha = $1` ,
        [idCancha]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetReservaDetails = async (req, res) => {
    const idReserva = req.params.id_horario;
    /*console.log(JSON.stringify(id));*/    
    try {
        const result = await db.query(`SELECT u.id, u.username, h.inicio, h.fin, h.id_horario 
        from users u
        JOIN reserva r on r.id_socio = u.id
        JOIN horarioscancha h on h.id_horario = r.id_horario
        WHERE r.id_horario = $1` ,
        [idReserva]);
        console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addReservacion, GetCanchaReservaciones, 
    GetReservaDetails, UpdateReservacion, 
    DeleteReservacion
}