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
        const result = await db.query('DELETE from subtorneoParejas WHERE id_Pareja = $1 RETURNING *', [
            id_Pareja
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
        const result = await db.query(`SELECT u.id, u.username, st.nombre, p.id_pareja from users u
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


module.exports = {
    addSubtorneoPareja, GetAllParejas, 
    getSubtorneoParejas, UpdatePareja, 
    DeletePareja, addParejaMember, GetParejasMembers
}