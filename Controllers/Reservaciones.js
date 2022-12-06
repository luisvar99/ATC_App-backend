const {db} = require('../database');

const addReservacion = async (req, res) => {
    console.log("Creando reservacion");
    const idCancha = req.body.idCancha 
    const idHorario = req.body.idHorario
    const idSocio = req.body.idSocio
    const fecha = req.body.fecha
    const id_inv_uno = req.body.id_inv_uno
    const id_inv_dos = req.body.id_inv_dos
    

    try {
        const result = await db.query('INSERT INTO reserva (id_cancha, id_horario, id_socio, fecha, id_invitado_uno, id_invitado_dos) VALUES ($1,$2,$3, $4, $5, $6) RETURNING *', [
            idCancha,  idHorario, idSocio, fecha, id_inv_uno, id_inv_dos
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
        const result = await db.query('DELETE from reserva WHERE id_reserva = $1 RETURNING *', [
            id_Reservacion
        ]);
        res.json({Message: `Eliminada la Reserva Nro ${id_Reservacion}`});
    } catch (error) {
        console.log(error.message);
        res.json({Message: `Error: ${error.message}`});
    }
}

const GetCanchaReservaciones = async (req, res) => {

    const idCancha = req.params.idCancha
    const fecha = req.params.fecha
     console.log(fecha) 

    try {
        const result = await db.query(`SELECT u.id, u.username, h.inicio, h.fin, h.hora_inicio, h.id_horario, r.fecha
        from users u
        JOIN reserva r on r.id_socio = u.id
        JOIN horarioscancha h on h.id_horario = r.id_horario
        WHERE id_cancha = $1 and r.fecha = $2 ` , 
        [idCancha, fecha]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetReservaOwner = async (req, res) => {
    const idReserva = req.params.id_horario;
    /*console.log(JSON.stringify(id));*/    
    try {
        const result = await db.query(`SELECT u.accion, u.id, u.username, u.nombres, u.apellidos, h.inicio, h.fin, h.id_horario, r.id_reserva, r.id_cancha, r.fecha
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

const GetReservaDetails = async (req, res) => {
    const idReserva = req.params.idReserva;
    /*console.log(JSON.stringify(id));*/    
    try {
        const result = await db.query(`select r.id_socio, r.id_reserva, u.username invitados, h.inicio, h.fin, ca.nombre_cancha Cancha from reserva r
        JOIN canchas ca on ca.id_cancha = r.id_cancha
        JOIN users u on u.id = r.id_socio or u.id = r.id_invitado_uno or u.id = r.id_invitado_dos
        JOIN horarioscancha h on h.id_horario = r.id_horario
        WHERE id_reserva = $1` ,
        [idReserva]);
        //console.log("RESULT : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addReservacion, GetCanchaReservaciones, 
    GetReservaDetails, UpdateReservacion, 
    DeleteReservacion, GetReservaOwner
}