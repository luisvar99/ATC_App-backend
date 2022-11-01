const {db} = require('../database');

const addGrupo = async (req, res) => {
    const idSubTorneo = req.params.idSubTorneo 

    try {
        const result = await db.query('INSERT INTO subtorneogrupos (id_subtorneo, id_grupo) VALUES ($1,$2) RETURNING *', [
            idSubTorneo
        ]);
        res.json(result.rows[0]);
    } catch (error) {
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
        console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const GetGrupoById = async (req, res) => {
    const id = req.params.idGrupo;
    console.log(JSON.stringify(id));
    try {
        const result = await db.query('SELECT * FROM subtorneogrupos WHERE id_Grupo = $1 ' , 
        [id]);
        console.log("RESULT : " + result);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addGrupo, GetAllGrupos, 
    GetGrupoById, UpdateGrupo, 
    DeleteGrupo
}