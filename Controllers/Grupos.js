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
            const result = await db.query('INSERT INTO participantesgrupo (id_grupo, user_id, id_subtorneo) VALUES ($1,$2, $3) RETURNING *', [
                id_grupo, user_id, idSubtorneo
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
const PublishGrupos = async (req, res) => {
    
    const isPublicado = req.body.isPublicado;
    const idSubtorneo = req.params.idSubtorneo;

    try {
        const result = await db.query('UPDATE subtorneogrupos set "isPublicado"=$1 WHERE id_Subtorneo = $2 RETURNING *', [
            isPublicado,  idSubtorneo
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
    //console.log("getSubtorneoGrupos:" + idSubTorneo);
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
        par.id_pareja, subgrupo.numero_grupo
        from users u
        JOIN participantesgrupo part on part.user_id = u.id
        JOIN subtorneogrupos subgrupo on subgrupo.id_grupo = part.id_grupo
        JOIN subtorneos subt on subt.id_subtorneo = subgrupo.id_subtorneo
        JOIN torneos tor on tor.id_torneo = subt.id_torneo
        JOIN parejas par on par.id_user_one = u.id or par.id_user_two = u.id
        WHERE part.id_subtorneo = $1 AND par.id_subtorneo = $2
        ORDER BY subgrupo.numero_grupo, par.id_pareja`  , 
        [idSubTorneo, idSubTorneo]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log("GetGruposMembers: " + error.message);
    }
}
const GetGruposById = async (req, res) => {
    const idGrupo = req.params.idGrupo;
    const id_subtorneo = req.params.id_subtorneo;
    //console.log("GetGruposById: " + id_subtorneo);
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
        WHERE subgrupo.id_grupo = $1 AND par.id_subtorneo = $2
        ORDER BY subgrupo.numero_grupo, par.id_pareja`  , 
        [idGrupo, id_subtorneo]);
        //console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

//======================COLORES========================================

const CreateColoresGrupo = async (req, res) => {
    const id_torneo = req.body.id_torneo 
    const nombre_bombo = req.body.nombre_bombo 
    //console.log("numberOfGroups: " + typeof(numberOfGroups));
    try {
        const result = await db.query(`INSERT INTO bomboscolores (id_torneo, nombre_bombo) VALUES ($1, $2) RETURNING *`, [
            id_torneo, nombre_bombo])
            
        res.json({success:true, result: result.rows[0]});
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }        
}
const UpdateColoresGrupo = async (req, res) => {
    const id_bombo = req.params.id_bombo 
    const id_torneo = req.body.id_torneo 
    const nombre_bombo = req.body.nombre_bombo 
    //console.log("numberOfGroups: " + typeof(numberOfGroups));
    try {
        const result = await db.query(`UPDATE bomboscolores SET nombre_bombo = $1 
        WHERE id_bombo = $2 RETURNING *`, [
            nombre_bombo, id_bombo])
            
        res.json({success:true, result: result.rows[0]});
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }        
}

const CreateColoresEquipo = async (req, res) => {
    const nombre_equipo = req.body.nombre_equipo 
    const id_bombo = req.body.id_bombo 
    const id_torneo = req.body.id_torneo 
    const isPublicado = req.body.isPublicado 
    const color = req.body.color 

    try {
        const result = await db.query(`INSERT INTO equiposcolores (nombre_equipo, id_bombo, id_torneo, "isPublicado", color) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
            nombre_equipo, id_bombo, id_torneo, isPublicado, color])
            
        res.json({success:true, result: result.rows[0]});
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }        
}

const GetColoresGrupo = async (req, res) => {
    const id_torneo = req.params.id_torneo
    const client = await db.connect()
    //console.log("id_torneo" + id_torneo);
    try {
        const result = await db.query(`SELECT * FROM bomboscolores WHERE id_torneo = $1 ORDER BY nombre_bombo`, [
            id_torneo])
            
        res.json(result.rows);
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }finally{
        await client.close()
    }  
}

const GetColoresGrupoForUsers = async (req, res) => {
    const id_torneo = req.params.id_torneo 
    //console.log("id_torneo" + id_torneo);
    try {
        const result = await db.query(`SELECT * FROM bomboscolores 
        WHERE id_torneo = $1 AND ispublicado=1
        ORDER BY nombre_bombo`, [
            id_torneo])
            
        res.json(result.rows);
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }        
}

const GetColoresTeamsByGroup = async (req, res) => {
    const id_bombo = req.params.id_bombo 
    //console.log("id_bombo" + id_bombo);
    try {
        const result = await db.query(`SELECT e.id_equipo, e.nombre_equipo, bomb.id_bombo, e.color, 
        bomb.nombre_bombo 
        FROM equiposcolores e
        JOIN bomboscolores bomb ON bomb.id_bombo=e.id_bombo 
        WHERE bomb.id_bombo = $1 `, [
            id_bombo])
            
        res.json(result.rows);
        //console.log(result.rows);
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }        
}

const GetEquiposColores = async (req, res) => {
    const id_torneo = req.params.id_torneo 
    const client = await db.connect()
    try {
        const result = await db.query(`SELECT * from equiposcolores 
        WHERE id_torneo = $1 `, [
            id_torneo])
            
        res.json(result.rows);
        //console.log(result.rows);
    } catch (error) {
        res.json({success: 'Failed', error: error.message});
        console.log(error.message);
    }finally{
        await client.close()
    }          
}

const getColoresEquipoById = async (req, res) => {
    const id_torneo = req.params.id_torneo 
    const id_equipo = req.params.id_equipo 
    try {
        const result = await db.query(`SELECT * from equiposcolores 
        WHERE id_torneo = $1 AND id_equipo = $2`, [
            id_torneo, id_equipo])
            
        res.json(result.rows);
        //console.log(result.rows);
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }        
}

const getColoresGrupoById = async (req, res) => {
    const id_bombo = req.params.id_bombo 
    try {
        const result = await db.query(`SELECT * from bomboscolores 
        WHERE id_bombo = $1`, [
            id_bombo])
            
        res.json(result.rows);
        //console.log(result.rows);
        } catch (error) {
            res.json({success: 'Failed', error: error.message});
            console.log(error.message);
    }        
}

const PublishColoresTeamsAndGroups = async (req, res) => {
    const id_torneo = req.params.id_torneo 
    try {
        const result = await db.query(`UPDATE equiposcolores SET "isPublicado" = 1  
        WHERE id_torneo = $1 `, [
            id_torneo])
        const resultTwo = await db.query(`UPDATE bomboscolores SET "ispublicado" = 1  
        WHERE id_torneo = $1 `, [
            id_torneo])
        
        res.json({result: result.rows, success: true});
        //console.log(result.rows);
        } catch (error) {
            res.json({success: false, error: error.message});
            console.log(error.message);
    }        
}

const DeleteColoresGrupo = async (req, res) => {

    const id_bombo = req.params.id_bombo;

    try {
        const result = await db.query('DELETE from bomboscolores WHERE id_bombo = $1 RETURNING *', [
            id_bombo
        ]);
        res.json({QueryUno: result.rows[0]/* , QueryDos: resultTwo.rows[0] */});
    } catch (error) {
        console.log(error.message);
    }
}
const DeleteColoresEquipo = async (req, res) => {

    const id_equipo = req.params.id_equipo;

    try {
        const result = await db.query('DELETE from equiposcolores WHERE id_equipo = $1 RETURNING *', [
            id_equipo
        ]);
        const deleteResult = await db.query(`DELETE from parejascolores
        WHERE id_equipo = $1 RETURNING *`, [
            id_equipo
        ]);
        res.json({QueryUno: result.rows[0], QueryDos: deleteResult.rows[0]});
    } catch (error) {
        console.log(error.message);
    }
}

const UpdateColoresEquipo = async (req, res) => {

    const nombre_equipo = req.body.nombre_equipo;
    const id_bombo = req.body.id_bombo;
    const id_torneo = req.body.id_torneo;
    const ispublicado = req.body.ispublicado;
    const color = req.body.color;
    const id_equipo = req.params.id_equipo

    try {
        const result = await db.query(`UPDATE equiposcolores set nombre_equipo = $1, id_bombo = $2, id_torneo = $3, "isPublicado" = $4, color = $5 
        WHERE id_equipo = $6 AND id_torneo = $7 RETURNING *`, [
            nombre_equipo, id_bombo, id_torneo, ispublicado, color, id_equipo, id_torneo
        ]);
        res.json({QueryUno: result.rows[0]});
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addGrupo, GetAllGrupos, getSubtorneoGrupos, 
    UpdateGrupo, DeleteGrupo, addGrupoMember, 
    GetGruposMembers, DeleteSubTorneoGroupParticipant, GetGruposById,
    PublishGrupos, CreateColoresGrupo, GetColoresGrupo,
    CreateColoresEquipo, GetColoresTeamsByGroup,
    GetEquiposColores, PublishColoresTeamsAndGroups,
    DeleteColoresGrupo, getColoresEquipoById,
    UpdateColoresEquipo, DeleteColoresEquipo,
    UpdateColoresGrupo, getColoresGrupoById, GetColoresGrupoForUsers
}