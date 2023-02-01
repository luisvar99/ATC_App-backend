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
const JornadasRoute = require('./Routes/Jornadas')


const session = require('express-session')
require('dotenv').config();

const app = express();
const corsOptions ={
    //origin: 'http://localhost:3000' ,
    origin: ['http://localhost:3000', 'https://63d9d484a97e75000826c9fc--eloquent-kataifi-0580d4.netlify.app'],
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
app.use(JornadasRoute)

app.get('/', async (req, res) => {
    try {
        //const result = await db.query('SELECT * FROM canchas order by nombre_cancha');
        res.json("Conectado a Backend");
    } catch (error) {
        res.json({error: error.message})
    }
        //console.log("RESULT : " + JSON.stringify(result));
})

const PORT = process.env.PORT || 4000
app.listen(PORT, (req, res) => {
    console.log(`Listening on port number: ${PORT}`);
})