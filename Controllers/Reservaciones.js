const {db} = require('../database');

const addReservacion = async (req, res) => {
    console.log("Creando reservacion");
    console.log(req.body);
    const idCancha = req.body.idCancha 
    const idHorario = req.body.idHorario
    const idSocio = req.body.idSocio
    const fecha = req.body.fecha
    const id_inv_uno = req.body.id_inv_uno
    const id_inv_dos = req.body.id_inv_dos
    const descripcion = req.body.descripcion
    

    try {
        const checkReservation = await db.query(`SELECT * FROM reserva r
        JOIN users u ON r.id_socio = u.id 
        WHERE r.fecha = $1 AND id_socio = $2 AND u.rol != 'ADMIN' `, [
            fecha, idSocio
        ]);

        if(checkReservation.rowCount>=2){
            res.json({validReservation: false, success: false});
        }else{
            const result = await db.query('INSERT INTO reserva (id_cancha, id_horario, id_socio, fecha, id_invitado_uno, id_invitado_dos, descripcion) VALUES ($1,$2,$3, $4, $5, $6, $7) RETURNING *', [
                idCancha,  idHorario, idSocio, fecha, id_inv_uno, id_inv_dos, descripcion
            ]);
            res.json(result.rows[0]);
        }

    } catch (error) {
        res.json({success:false});
        console.log(error.message);
    }   
}
    

const UpdateReservacion = async (req, res) => {
    console.log(req.body);
    const idCancha = req.body.idCancha;
    const idHorario = req.body.idHorario;
    const idSocio = req.body.idSocio;
    /* const fecha = req.body.fecha; */
    const id_inv_uno = req.body.id_inv_uno;
    const id_inv_dos = req.body.id_inv_dos;
    const id_reserva = req.params.id_reserva;

    try {
        const result = await db.query(`UPDATE reserva set id_cancha=$1, id_horario=$2, 
        id_socio=$3, id_invitado_uno = $4, id_invitado_dos = $5 
        WHERE id_reserva = $6 RETURNING *`, [
            idCancha,  idHorario, idSocio, id_inv_uno, id_inv_dos, id_reserva
        ]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteReservacion = async (req, res) => {
    const id_Reservacion = req.params.idReservacion;
    console.log(id_Reservacion);
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
        const result = await db.query(`SELECT u.accion, u.id, u.username, u.nombres, 
        u.apellidos, h.inicio, h.fin, h.id_horario, r.id_reserva, r.id_cancha, r.fecha, r.descripcion
        from users u
        JOIN reserva r on r.id_socio = u.id
        JOIN horarioscancha h on h.id_horario = r.id_horario
        WHERE r.id_horario = $1` ,
        [idReserva]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetReservaDetails = async (req, res) => {
    const idReserva = req.params.idReserva;
    const id_socio = req.params.id_socio;
    
    /*console.log(JSON.stringify(id));*/    
    try {
        const result = await db.query(`select r.id_socio, r.id_reserva, u.username invitados, 
        h.inicio, h.fin, ca.nombre_cancha Cancha, r.fecha, u.id,  r.id_horario
        from reserva r
        JOIN canchas ca on ca.id_cancha = r.id_cancha
        JOIN users u ON u.id = r.id_invitado_uno or u.id = r.id_invitado_dos
        JOIN horarioscancha h on h.id_horario = r.id_horario
        WHERE id_reserva = $1 AND r.id_socio = $2` ,
        [idReserva, id_socio]);
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