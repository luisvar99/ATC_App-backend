const express = require('express');
const cors = require('cors');
const canchaRoute = require('./Routes/Canchas')
const AuthRoute = require('./Routes/Auth')
const TorneosRoute = require('./Routes/Torneos')
const SubTorneosRoute = require('./Routes/SubTorneos')
const TorneoParticipantesRoute = require('./Routes/ParticipantesTorneos')
const GruposRoute = require('./Routes/Grupos')
const UsersRoute = require('./Routes/Users')
const ParejasRoute = require('./Routes/Parejas')
const HorariosRoute = require('./Routes/Horarios')
const ReservacionesRoute = require('./Routes/Reservaciones')
const MatchesRoute = require('./Routes/Matches')
const RondasRoute = require('./Routes/Rondas')
const {db} = require('./database');


const session = require('express-session')
require('dotenv').config();

const app = express();
const corsOptions ={
    origin: 'http://localhost:3000' ,
    //origin: ['http://localhost:3000', 'https://63606636b4c06a00093194b6--eloquent-kataifi-0580d4.netlify.app'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.ENVIRONMENT==="production" ? "true" : "auto",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT==="production" ? "none" : "lax",
    }
}));

app.use(canchaRoute)
app.use(AuthRoute)
app.use(TorneosRoute)
app.use(SubTorneosRoute)
app.use(TorneoParticipantesRoute)
app.use(GruposRoute)
app.use(UsersRoute)
app.use(ParejasRoute)
app.use(HorariosRoute)
app.use(ReservacionesRoute)
app.use(MatchesRoute)
app.use(RondasRoute)

app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM canchas order by nombre_cancha');
        res.json(result.rows);
    } catch (error) {
        res.json({error: error.message})
    }
        //console.log("RESULT : " + JSON.stringify(result));
})

app.get('/api/getAllCanchas', async (req, res) => {
    const result = await db.query('SELECT * FROM canchas order by nombre_cancha');
        //console.log("RESULT : " + JSON.stringify(result));
        res.json(result.rows);
})

const PORT = process.env.PORT || 4000
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
/* sequelize.authenticate().then(() => {
    console.log("Conexion exitosa a la BD");
}) */
})