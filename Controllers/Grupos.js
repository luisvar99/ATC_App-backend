const {db} = require('../database');

const addGrupo = async (req, res) => {
    const idSubTorneo = req.body.idSubTorneo 
    const isPublicado = req.body.isPublicado 
    const numberOfGroups = parseInt(req.params.numberOfGroups);
    var aux = 0;
    const response = [];
    //console.log("numberOfGroups: " + typeof(numberOfGroups));
    try {
        const lastNumberGroup = await db.query(`select MAX(numero_grupo) as last FROM subtorneogrupos WHERE id_subtorneo = $1 `, [
            idSubTorneo
        ]);

        if(lastNumberGroup.rows[0].last === null){
            aux = 1;
        }else{
            aux = lastNumberGroup.rows[0].last+1;
        }
        //console.log("aux: " + typeof(aux));

        for (let index = aux; index < numberOfGroups+aux; index++) {
            const result = await db.query(`INSERT INTO subtorneogrupos (id_subtorneo, "isPublicado", numero_grupo) VALUES ($1, $2, $3 ) RETURNING *`, [
                idSubTorneo, isPublicado, index
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
    const idSubtorneo = req.body.idSubtorneo;
    //console.log(idSubTorneo + ' ' + numberOfGroups);
    try {
        
        const validGroupMember = await db.query(`SELECT pg.id_grupo, pg.user_id, subtg.id_subtorneo 
        from participantesgrupo pg
        JOIN subtorneogrupos subtg ON subtg.id_grupo = pg.id_grupo
        WHERE subtg.id_subtorneo = $1 AND pg.user_id = $2`, 
        [idSubtorneo, user_id]);

        //console.log('rowCount: ' + validGroupMember.rowCount);

        if(validGroupMember.rowCount){

            res.json({success:false, error: 1});

        }else{
            const result = await db.query('INSERT INTO participantesgrupo (id_grupo, user_id) VALUES ($1,$2) RETURNING *', [
                id_grupo, user_id
            ]);
            res.json({success:true, result: result});
        }

    } catch (error) {
        res.json({success: false, error: error.message});
        console.log(error.message);
    }        
}
const UpdateGrupo = async (req, res) => {
    
    const name = req.body.nombre_Grupo;
    const category = req.body.id_categoriaGrupo;
    const status = req.body.estatus_Grupo;
    const id_Grupo = req.params.idGrupo;

    try {
        const result = await db.query('UPDATE subtorneogrupos set numero_grupo=$1, id_categoriaGrupo=$2, estatus_Grupo=$3 WHERE id_Grupo = $4 RETURNING *', [
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

const DeleteSubTorneoGroupParticipant = async (req, res) => {

    const idGrupo = req.params.idGrupo;
    const idUser = req.params.idUser;

    try {
        const result = await db.query('DELETE from participantesgrupo WHERE id_grupo = $1 AND user_id = $2 RETURNING *', [
            idGrupo, idUser
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
    //console.log(idSubTorneo);
    try {
        const result = await db.query('SELECT * FROM subtorneogrupos WHERE id_subtorneo = $1 ORDER BY numero_grupo' , 
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
        const result = await db.query(`select u.accion, u.nombres, u.apellidos, u.id, u.username, 
        subt.nombre, tor.nombre_torneo, subgrupo.numero_grupo, part.id_grupo, subgrupo."isPublicado", 
        par.id_pareja
        from users u
        JOIN participantesgrupo part on part.user_id = u.id
        JOIN subtorneogrupos subgrupo on subgrupo.id_grupo = part.id_grupo
        JOIN subtorneos subt on subt.id_subtorneo = subgrupo.id_subtorneo
        JOIN torneos tor on tor.id_torneo = subt.id_torneo
        JOIN parejas par on par.id_user_one = u.id or par.id_user_two = u.id
        WHERE subgrupo.id_subtorneo = $1 
        ORDER BY subgrupo.numero_grupo, par.id_pareja`  , 
        [idSubTorneo]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }finally{
    }
}


module.exports = {
    addGrupo, GetAllGrupos, 
    getSubtorneoGrupos, UpdateGrupo, 
    DeleteGrupo, addGrupoMember, GetGruposMembers,
    DeleteSubTorneoGroupParticipant
}