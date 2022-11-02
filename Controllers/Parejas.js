const {db} = require('../database');

const addSubtorneoPareja = async (req, res) => {
    const idSubTorneo = req.body.idSubTorneo 
    const nombre_grupo = req.body.nombre_grupo 
    const numberOfGroups = req.params.numberOfGroups 

    const response = [];
    //console.log(idSubTorneo + ' ' + numberOfGroups);
    try {
        for (let index = 0; index < numberOfGroups; index++) {
            const result = await db.query(`INSERT INTO subtorneogrupos (id_subtorneo, nombre_grupo) VALUES ($1, 'Grupo ${index+1}' ) RETURNING *`, [
                idSubTorneo
            ]);
            response.push(result.rows[0]);
        }
        res.json({success:true, result: response});
    } catch (error) {
        res.json({success: 'Failed', error: error.message});
        console.log(error.message);
    }        
}
const addGrupoMember = async (req, res) => {
    const id_grupo = req.body.id_grupo;
    const user_id = req.body.user_id;
    //console.log(idSubTorneo + ' ' + numberOfGroups);
    try {
            const result = await db.query('INSERT INTO participantesgrupo (id_grupo, user_id) VALUES ($1,$2) RETURNING *', [
                id_grupo, user_id
            ]);
        res.json({success:true, result: result});
    } catch (error) {
        res.json({success: 'Failed', error: error.message});
        console.log(error.message);
    }        
}
const UpdateGrupo = async (req, res) => {
    
    const name = req.body.nombre_Grupo;
    const category = req.body.id_categoriaGrupo;
    const status = req.body.estatus_Grupo;
    const id_Grupo = req.params.idGrupo;

    try {
        const result = await db.query('UPDATE subtorneogrupos set nombre_Grupo=$1, id_categoriaGrupo=$2, estatus_Grupo=$3 WHERE id_Grupo = $4 RETURNING *', [
            name,  category, status, id_Grupo
        ]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteGrupo = async (req, res) => {

    const id_Grupo = req.params.idGrupo;

    try {
        const result = await db.query('DELETE from subtorneogrupos WHERE id_Grupo = $1 RETURNING *', [
            id_Grupo
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const GetAllGrupos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM subtorneogrupos');
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const getSubtorneoGrupos = async (req, res) => {
    const idSubTorneo = req.params.idSubtorneo;
    console.log(idSubTorneo);
    try {
        const result = await db.query('SELECT * FROM subtorneogrupos WHERE id_subtorneo = $1 ' , 
        [idSubTorneo]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetGruposMembers = async (req, res) => {
    const idSubTorneo = req.params.idSubtorneo;
    try {
        const result = await db.query(`select u.username, subt.nombre, tor.nombre_torneo, subgrupo.nombre_grupo
        from users u
        JOIN participantesgrupo part on part.user_id = u.id
        JOIN subtorneogrupos subgrupo on subgrupo.id_grupo = part.id_grupo
        JOIN subtorneos subt on subt.id_subtorneo = subgrupo.id_subtorneo
        JOIN torneos tor on tor.id_torneo = subt.id_torneo
        WHERE subgrupo.id_subtorneo = $1
        ORDER BY subgrupo.nombre_grupo`  , 
        [idSubTorneo]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addSubtorneoPareja, GetAllGrupos, 
    getSubtorneoGrupos, UpdateGrupo, 
    DeleteGrupo, addGrupoMember, GetGruposMembers
}