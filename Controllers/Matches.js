const {db} = require('../database');

const addMatch = async (req, res) => {
    
    const idSubtorneo = req.body.idSubtorneo
    const id_player_uno = req.body.id_player_uno
    const id_player_dos = req.body.id_player_dos
    const id_player_tres = req.body.id_player_tres
    const id_player_cuatro = req.body.id_player_cuatro
    const resultado = req.body.resultado
    const fecha = req.body.fecha
    const hora = req.body.hora
    const ronda = req.body.ronda
    const id_cancha = req.body.id_cancha

    try {
        const result = await db.query('INSERT INTO partido (id_subtorneo, id_player_uno,id_player_dos, id_player_tres, id_player_cuatro, resultado, fecha, id_ronda, id_horario, id_cancha ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9, $10) RETURNING *', [
            idSubtorneo,  id_player_uno, id_player_dos, id_player_tres, id_player_cuatro, resultado, fecha, ronda, hora,  id_cancha
        ]);
        res.json({success:true});
    } catch (error) {
        res.json({success:false});
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

const DeleteMatch = async (req, res) => {

    const id_Match = req.params.idMatch;

    try {
        const result = await db.query('DELETE from partido WHERE id_partido = $1 RETURNING *', [
            id_Match
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const GetSubtorneoMatchesById = async (req, res) => {
    const idPartido = req.params.idPartido;
    //console.log("idPartido " + idPartido);

    try {
        const result = await db.query(`select u.nombres, u.apellidos, part.id_partido, part.fecha, 
        part.id_horario, u.accion, rnd.nombre, u.accion, tor.modalidad, can.nombre_cancha
        from users u
        JOIN partido part on part.id_player_uno = u.id or part.id_player_dos = u.id or 
        part.id_player_tres = u.id or part.id_player_cuatro = u.id 
        JOIN rondas rnd on rnd.id_ronda = part.id_ronda
        JOIN subtorneos subtor on subtor.id_subtorneo = part.id_subtorneo
		JOIN torneos tor on tor.id_torneo = subtor.id_torneo
        JOIN canchas can ON can.id_cancha = part.id_cancha
        WHERE id_partido = $1
        Order by id_partido`,
        [idPartido]
        );
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetSubtorneoMatches = async (req, res) => {
    const id = req.params.idSubtorneo;
    //console.log("GetSubtorneoMatches " + id);
    try {
        const result = await db.query(`select * from partido
        WHERE id_subtorneo = $1 
        Order by id_partido` , 
        [id]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


// --------------------------- QUERIES CON TONREO COLORES ---------------------------
const GetColoresMatches = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    //console.log("id_torneo " + id_torneo);
    try {
        const result = await db.query(`SELECT * from partidocolores
        WHERE id_torneo = $1`,
        [id_torneo]);
        res.json(result.rows);
        console.log("result.rows " + result.rowCount);
    } catch (error) {
        console.log(error.message);
    }
}

const GetColoresEnfretamientosPlayers = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    const id_partido = req.params.id_partido;
    //console.log("GetSubtorneoMatches " + id);
    try {
        const result = await db.query(`SELECT u.nombres, u.apellidos, r.nombre, can.nombre_cancha, 
        eq.color, partido.resultado, partido.fecha, u.accion
        from participantescolores pc
        JOIN users u ON u.id = pc.user_id
        JOIN partidocolores partido ON partido.player_one = u.id OR partido.player_two = u.id OR 
        partido.player_three = u.id OR partido.player_four = u.id
        JOIN canchas can ON can.id_cancha = partido.id_cancha
        JOIN rondas r ON r.id_ronda = partido.id_ronda
        JOIN equiposcolores eq ON eq.id_equipo = pc.id_equipo
        WHERE pc.id_torneo = $1 AND partido.id_partido = $2
        ORDER BY partido.fecha` , 
        [id_torneo, id_partido]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetColoresMatchById = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    const id_partido = req.params.id_partido;
    //console.log("GetSubtorneoMatches " + id);
    try {
        const result = await db.query(`SELECT partido.id_partido, u.nombres, u.apellidos, 
        partido.fecha, r.nombre, partido.resultado, hc.inicio, can.nombre_cancha,
        r.id_ronda, hc.id_horario, can.id_cancha, ec.nombre_equipo, u.accion
        FROM participantescolores pc
        JOIN users u ON pc.user_id = u.id
        JOIN partidocolores partido ON partido.player_one = u.id OR partido.player_two = u.id OR 
		partido.player_three = u.id OR partido.player_four = u.id
        JOIN rondas r ON r.id_ronda = partido.id_ronda
        JOIN equiposcolores ec ON ec.id_equipo = pc.id_equipo
		JOIN horarioscancha hc ON hc.id_horario = partido.id_horario
		JOIN canchas can ON can.id_cancha = partido.id_cancha
        WHERE pc.id_torneo = $1 AND partido.id_partido = $2` , 
        [id_torneo, id_partido]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}
/* const GetColoresMatchById = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    const id_partido = req.params.id_partido;
    //console.log("GetSubtorneoMatches " + id);
    try {
        const result = await db.query(`SELECT pc.id_partido, u.nombres, u.apellidos, 
        pc.fecha, r.nombre, parejas.id_pareja, pc.resultado, hc.inicio, can.nombre_cancha,
        r.id_ronda, hc.id_horario, can.id_cancha
        FROM parejascolores parejas
        JOIN users u ON parejas.id_user_one = u.id OR parejas.id_user_two = u.id
        JOIN partidocolores pc ON pc.id_pareja_one = parejas.id_pareja OR pc.id_pareja_two = parejas.id_pareja 
        JOIN rondas r ON r.id_ronda = pc.id_ronda
        JOIN equiposcolores ec ON ec.id_equipo = parejas.id_equipo
		JOIN horarioscancha hc ON hc.id_horario = pc.id_horario
		JOIN canchas can ON can.id_cancha = pc.id_cancha
        WHERE pc.id_torneo = $1 AND pc.id_partido = $2` , 
        [id_torneo, id_partido]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} */

const addColoresMatch = async (req, res) => {
    
    const id_torneo = req.body.id_torneo
    const player_one = req.body.player_one
    const player_two = req.body.player_two
    const player_three = req.body.player_three
    const player_four = req.body.player_four
    const fecha = req.body.fecha
    const resultado = req.body.resultado
    const id_ronda = req.body.idRonda
    const id_hora = req.body.IdHorario
    const id_cancha = req.body.id_cancha

    try {
        const result = await db.query('INSERT INTO partidocolores (id_torneo, player_one, player_two, player_three, player_four, fecha, resultado, id_ronda, id_horario, id_cancha) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9, $10) RETURNING *', [
            id_torneo,  player_one, player_two, player_three, player_four, fecha, resultado, id_ronda, id_hora, id_cancha
        ]);
        res.json({success:true});
    } catch (error) {
        res.json({success:false});
        console.log(error.message);
    }
}

const DeleteColoresEnfrentamiento = async (req, res) => {

    const id_partido = req.params.id_partido;
    const id_cancha = req.params.id_cancha;
    const id_horario = req.params.id_horario;
    const fecha = req.params.fecha;
    //console.log(req.params);

    try {
        const result = await db.query('DELETE from partidocolores WHERE id_partido = $1 RETURNING *', [
            id_partido
        ]);
        const resultReserva = await db.query(`DELETE from reserva 
        WHERE id_cancha = $1 AND id_horario = $2 AND fecha = $3  RETURNING *`, [
            id_cancha, id_horario, fecha
        ]);

        res.json({quno: result.rows, qdos: resultReserva.rows});
    } catch (error) {
        console.log(error.message);
    }
}

const editColoresMatch = async (req, res) => {
    console.log(req.body);
    const id_partido = req.params.id_partido
    const id_player_one = req.body.id_player_one
    const id_player_two = req.body.id_player_two
    const id_player_three = req.body.id_player_three
    const id_player_four = req.body.id_player_four
    const fecha = req.body.fecha
    const resultado = req.body.resultado
    const id_ronda = req.body.id_ronda
    const id_hora = req.body.id_horario
    const id_cancha = req.body.id_cancha

    try {
        const result = await db.query(`UPDATE partidocolores SET player_one = $1, player_two = $2, player_three = $3, player_four = $4, fecha = $5, resultado = $6, id_ronda = $7, id_horario = $8, id_cancha = $9
        WHERE id_partido = $10 RETURNING *`, [
            id_player_one, id_player_two, id_player_three, id_player_four, fecha, resultado, id_ronda, id_hora, id_cancha, id_partido
        ]);
        res.json({result: result.rows, success: true})
    } catch (error) {
        console.log(error.message);
        res.json({success: false})
    }
}

module.exports = {
    addMatch, GetSubtorneoMatchesById, 
    GetSubtorneoMatches, UpdateHorario, 
    DeleteMatch, GetColoresMatches, addColoresMatch,
    GetColoresEnfretamientosPlayers,DeleteColoresEnfrentamiento,
    GetColoresMatchById, editColoresMatch
}