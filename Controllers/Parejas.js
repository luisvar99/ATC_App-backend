const {db} = require('../database');

const addSubtorneoPareja = async (req, res) => {
    const idSubTorneo = req.body.id_subtorneo 
    const myId = req.body.myId 
    const myParejaId = req.body.myParejaId 

    //console.log(idSubTorneo + ' ' + numberOfGroups);
    try {
            const result = await db.query(`INSERT INTO parejas (id_user_one, id_user_two, id_subtorneo) VALUES ($1, $2, $3 ) RETURNING *`, [
                myId, myParejaId, idSubTorneo
            ]);
            
        res.json({message:"Pareja inscrita", result:result.rows});
    } catch (error) {
        res.json({success: 'Failed', error: error.message});
        console.log(error.message);
    }        
}
const addParejaMember = async (req, res) => {
    const id_Pareja = req.body.id_Pareja;
    const user_id = req.body.user_id;
    //console.log(idSubTorneo + ' ' + numberOfGroups);
    try {
            const result = await db.query('INSERT INTO participantesPareja (id_Pareja, user_id) VALUES ($1,$2) RETURNING *', [
                id_Pareja, user_id
            ]);
        res.json({success:true, result: result});
    } catch (error) {
        res.json({success: 'Failed', error: error.message});
        console.log(error.message);
    }        
}
const UpdatePareja = async (req, res) => {
    
    const name = req.body.nombre_Pareja;
    const category = req.body.id_categoriaPareja;
    const status = req.body.estatus_Pareja;
    const id_Pareja = req.params.idPareja;

    try {
        const result = await db.query('UPDATE subtorneoParejas set nombre_Pareja=$1, id_categoriaPareja=$2, estatus_Pareja=$3 WHERE id_Pareja = $4 RETURNING *', [
            name,  category, status, id_Pareja
        ]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const DeletePareja = async (req, res) => {

    const id_Pareja = req.params.idPareja;

    try {
        const result = await db.query('DELETE from parejas WHERE id_Pareja = $1 RETURNING *', [
            id_Pareja
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteSubTorneoPareja = async (req, res) => {

    const id_Pareja = req.params.idPareja;
    const id_subtorneo = req.params.id_subtorneo;

    try {
        const result = await db.query('DELETE from parejas WHERE id_Pareja = $1 AND id_subtorneo = $2 RETURNING *', [
            id_Pareja, id_subtorneo
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}


/* const DeleteColoresPareja = async (req, res) => {

    const id_Pareja = req.params.idPareja;

    try {
        const result = await db.query('DELETE from parejascolores WHERE id_Pareja = $1 RETURNING *', [
            id_Pareja
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
} */

const DeleteColoresParticipante = async (req, res) => {

    const id_Pareja = req.params.idPareja;
    const id_torneo = req.params.id_torneo;

    try {
        const result = await db.query(`DELETE from participantescolores 
        WHERE user_id = $1 AND id_torneo = $2 RETURNING *`, [
            id_Pareja, id_torneo
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const GetAllParejas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM subtorneoParejas');
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const getSubtorneoParejas = async (req, res) => {
    const idSubTorneo = req.params.idSubtorneo;
    console.log(idSubTorneo);
    try {
        const result = await db.query(`SELECT u.id, u.username, u.nombres, u.apellidos, u.accion, st.nombre, p.id_pareja from users u
        JOIN parejas p on p.id_user_one = u.id or p.id_user_two = u.id
        JOIN subtorneos st on st.id_subtorneo = p.id_subtorneo WHERE p.id_subtorneo = $1 ` , 
        [idSubTorneo]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetParejasMembers = async (req, res) => {
    const idSubTorneo = req.params.idSubtorneo;
    try {
        const result = await db.query(`select u.username, subt.nombre, tor.nombre_torneo, subPareja.nombre_Pareja
        from users u
        JOIN participantesPareja part on part.user_id = u.id
        JOIN subtorneoParejas subPareja on subPareja.id_Pareja = part.id_Pareja
        JOIN subtorneos subt on subt.id_subtorneo = subPareja.id_subtorneo
        JOIN torneos tor on tor.id_torneo = subt.id_torneo
        WHERE subPareja.id_subtorneo = $1
        ORDER BY subPareja.nombre_Pareja`  , 
        [idSubTorneo]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

/* const GetColoresParejas = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    //console.log("id_torneo : " + id_torneo);
    try {
        const result = await db.query(`SELECT * FROM parejascolores WHERE id_torneo = $1 ` , 
        [id_torneo]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} */
const getColoresParticipantes = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    //console.log("id_torneo : " + id_torneo);
    try {
        const result = await db.query(`SELECT u.id, u.nombres, u.apellidos, u.accion, u.categoria
        FROM participantescolores pc
        JOIN users u ON u.id = pc.user_id
        WHERE id_torneo = $1 ORDER BY u.apellidos` , 
        [id_torneo]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

/* const GetColoresParejasMoreInfo = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    //console.log("id_torneo : " + id_torneo);

    try {
        const result = await db.query(`SELECT u.nombres, u.apellidos, u.accion, parejas.id_pareja, eq.nombre_equipo, u.id
        FROM parejascolores parejas
        JOIN users u ON parejas.id_user_one = u.id OR parejas.id_user_two = u.id
        JOIN equiposcolores eq ON eq.id_equipo = parejas.id_equipo
        WHERE parejas.id_torneo = $1
        ORDER BY id_pareja` , 
        [id_torneo]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} */

const GetColoresParticipantesMoreInfo = async (req, res) => {
    const id_torneo = req.params.id_torneo;
    //console.log("id_torneo : " + id_torneo);

    try {
        const result = await db.query(`SELECT u.nombres, u.apellidos, u.accion, eq.nombre_equipo, u.id
        FROM participantescolores pc
        JOIN users u ON pc.user_id = u.id
        JOIN equiposcolores eq ON eq.id_equipo = pc.id_equipo
        WHERE pc.id_torneo = $1
        ORDER BY eq.nombre_equipo` , 
        [id_torneo]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const getColoresParejasById = async (req, res) => {
    const id_pareja = req.params.id_pareja;
    //console.log("id_pareja : " + id_pareja);

    try {
        const result = await db.query(`select parejas.id_torneo, u.nombres, u.apellidos, u.accion,
        parejas.id_pareja, parejas.id_equipo
        FROM parejascolores parejas
        JOIN users u ON parejas.id_user_one = u.id or parejas.id_user_two = u.id
        WHERE id_pareja = $1
        ORDER BY parejas.id_pareja 
        ` , 
        [id_pareja]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

/* const SetEquipoToPareja = async (req, res) => {
    const id_equipo = req.body.id_equipo;
    const id_pareja = req.params.id_pareja;
    console.log("id_equipo : " + id_equipo);
    console.log("id_pareja : " + id_pareja);

    try {
        const result = await db.query(`UPDATE parejascolores SET id_equipo = $1
        WHERE id_pareja = $2` , 
        [id_equipo, id_pareja]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} */

const SetEquipoToParticipante = async (req, res) => {
    const id_equipo = req.body.id_equipo;
    const user_id = req.params.user_id;
    const id_torneo = req.params.id_torneo;
    /* console.log("id_equipo : " + id_equipo);
    console.log("id_pareja : " + id_pareja); */

    try {
        const result = await db.query(`UPDATE participantescolores SET id_equipo = $1
        WHERE user_id = $2 AND id_torneo = $3` , 
        [id_equipo, user_id, id_torneo]);
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

/* const getPlayersByTeam = async (req, res) => {
    const id_equipo = req.params.id_equipo;
    console.log("id_equipo : " + id_equipo);
    console.log("id_pareja : " + id_pareja);

    try {
        const result = await db.query(`SELECT u.nombres, u.apellidos, u.accion, parejas.id_pareja
        FROM parejascolores parejas
        JOIN users u ON parejas.id_user_one = u.id OR parejas.id_user_two = u.id
        WHERE id_equipo = $1` , 
        [id_equipo]);
        //console.log("RESULT : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} */

const getPlayersByTeam = async (req, res) => {
    const id_equipo = req.params.id_equipo;
    console.log("id_equipo : " + id_equipo);

    try {
        const result = await db.query(`SELECT u.nombres, u.apellidos, u.accion, u.id
        FROM participantescolores pc
        JOIN users u ON u.id = pc.user_id
        WHERE id_equipo = $1` , 
        [id_equipo]);
        //console.log("RESULT : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

/* const MakeColoresInscripcion = async (req, res) => {
    const id_torneo = req.body.id_torneo
    const id_user_one = req.body.id_user_one
    const id_user_two = req.body.id_user_two
    const id_equipo = req.body.id_equipo;
    console.log("id_equipo : " + id_equipo);
    console.log("id_pareja : " + id_pareja);

    try {
        const result = await db.query(`Insert into parejascolores(id_torneo, id_user_one, id_user_two, id_equipo) 
        VALUES ($1, $2, $3, $4)
        RETURNING * `, 
        [id_torneo, id_user_one, id_user_two, id_equipo, ]);
        //console.log("RESULT : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} */

const MakeColoresInscripcion = async (req, res) => {
    const id_torneo = req.body.id_torneo
    const user_id = req.body.user_id
    /* console.log("id_equipo : " + id_equipo);
    console.log("id_pareja : " + id_pareja); */

    try {
        const result = await db.query(`Insert into participantescolores(id_torneo, user_id) 
        VALUES ($1, $2)
        RETURNING * `, 
        [id_torneo, user_id]);
        //console.log("RESULT : " + JSON.stringify(result.rows));
        res.json({result: result.rows, success: true});
    } catch (error) {
        res.json({success: false, result: error.message});
        console.log(error.message);
    }
}

module.exports = {
    addSubtorneoPareja, GetAllParejas, 
    getSubtorneoParejas, UpdatePareja, 
    DeletePareja, DeleteSubTorneoPareja, addParejaMember, GetParejasMembers,
    /* GetColoresParejas */ getColoresParejasById, /* SetEquipoToPareja, */
    getPlayersByTeam, /* DeleteColoresPareja, */ MakeColoresInscripcion,
    /* GetColoresParejasMoreInfo, */ getColoresParticipantes, DeleteColoresParticipante,
    SetEquipoToParticipante, GetColoresParticipantesMoreInfo
}