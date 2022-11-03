const {db} = require('../database');


const addParticipant = async (req, res) => {
    
    const id_subtorneo = req.body.id_subtorneo 
    var user_id = req.body.user_id
    const myParejaId = req.body.myParejaId
    const modalidad = req.body.modalidad
    console.log("myParejaId " + myParejaId);
    console.log("modalidad " + modalidad);

    try {
        if(modalidad==="Dobles"){
            const doblesResult = []
            for (let index = 0; index < 2; index++) {
                const result = await db.query('INSERT INTO participantestorneo (id_subtorneo, user_id) VALUES ($1,$2) RETURNING *', [
                    id_subtorneo,  user_id
                ]);
                console.log("Vuelta " + index+1 + " id_subtorneo: " + user_id);
                user_id = myParejaId;
                console.log("Vuelta " + index+1 + " id_subtorneo: " + user_id);
                doblesResult.push(result.rows)
            }
            res.json({message: "Exito", result: doblesResult});
        }else{
            const result = await db.query('INSERT INTO participantestorneo (id_subtorneo, user_id) VALUES ($1,$2) RETURNING *', [
                id_subtorneo,  user_id
            ]);
            res.json({message: "Exito", result: result});
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    addParticipant
}