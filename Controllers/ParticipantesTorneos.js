const {db} = require('../database');


const addParticipant = async (req, res) => {
    
    const id_subtorneo = req.body.id_subtorneo 
    const user_id = req.body.user_id

    try {
        const result = await db.query('INSERT INTO participantestorneo (id_subtorneo, user_id) VALUES ($1,$2) RETURNING *', [
            id_subtorneo,  user_id
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    addParticipant
}