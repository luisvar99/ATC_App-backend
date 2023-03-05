const {db} = require('../database');
const {sendMail} = require('../NodeMailer/NodeMailer')

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
                
                //console.log("Vuelta " + index+1 + " UserId: " + user_id);
                user_id = myParejaId;
                //console.log("Vuelta " + index+1 + " UserId: " + user_id);
                doblesResult.push(result.rows)
            }
            res.json({message: "Exito", result: doblesResult, success: true});
            sendMail("luisvar2703@gmail.com", "fmaldifassi99@gmail.com", "PRUEBA APP ATC")
        }else{
            const result = await db.query('INSERT INTO participantestorneo (id_subtorneo, user_id) VALUES ($1,$2) RETURNING *', [
                id_subtorneo,  user_id
            ]);
            res.json({message: "Exito", result: result, success: true});
        }
            sendMail("luisvar2703@gmail.com", "fmaldifassi99@gmail.com", "PRUEBA")
    } catch (error) {
        console.log(error.message);
    }
}

const Desinscripcion = async (req, res) => {
    
    const id_subtorneo = req.params.id_subtorneo 
    var user_id = req.params.user_id
    const modalidad = req.params.modalidad
    const id_pareja = req.params.id_pareja

    try {
        if(modalidad==="Dobles"){
            const getParejaUsers = await db.query('SELECT id_user_one, id_user_two FROM parejas WHERE id_pareja = $1',[
                id_pareja
            ])
            const id_user_one = getParejaUsers[0]
            const id_user_two = getParejaUsers[1]
            const result = await db.query('DELETE FROM participantestorneo WHERE (user_id = $1 or user_id = $2) AND id_subtorneo = $3', [
                id_user_one, id_user_two, id_subtorneo])

        }else{
            const result = await db.query('DELETE FROM participantestorneo WHERE user_id = $1 AND id_subtorneo = $2',[
                user_id, id_subtorneo
            ]);
        }        

        res.json({success: true});
    } catch (error) {
            res.json({success: false});
            console.log(error.message);
        }
}


module.exports = {
    addParticipant, Desinscripcion
}