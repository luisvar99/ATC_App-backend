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

    try {
        const result = await db.query('INSERT INTO partido (id_subtorneo, id_player_uno,id_player_dos, id_player_tres, id_player_cuatro, resultado, fecha, hora, id_ronda) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9) RETURNING *', [
            idSubtorneo,  id_player_uno, id_player_dos, id_player_tres, id_player_cuatro, resultado, fecha, hora, ronda
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
    console.log("idPartido " + idPartido);

    try {
        const result = await db.query(`select u.nombres, u.apellidos, part.id_partido, part.fecha, 
        part.hora, u.accion, rnd.nombre, u.accion, tor.modalidad
        from users u
        JOIN partido part on part.id_player_uno = u.id or part.id_player_dos = u.id or 
        part.id_player_tres = u.id or part.id_player_cuatro = u.id 
        JOIN rondas rnd on rnd.id_ronda = part.id_ronda
        JOIN subtorneos subtor on subtor.id_subtorneo = part.id_subtorneo
		JOIN torneos tor on tor.id_torneo = subtor.id_torneo
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
    console.log("GetSubtorneoMatches " + id);
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


module.exports = {
    addMatch, GetSubtorneoMatchesById, 
    GetSubtorneoMatches, UpdateHorario, 
    DeleteMatch
}