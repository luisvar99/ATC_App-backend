const express = require('express');
const cors = require('cors');
const canchaRoute = require('./Routes/Canchas')
const AuthRoute = require('./Routes/Auth')
const TorneosRoute = require('./Routes/Torneos')
const SubTorneosRoute = require('./Routes/SubTorneos')
const TorneoParticipantesRoute = require('./Routes/ParticipantesTorneos')
//const {sequelize}= require('./models/index');
const session = require('express-session')
require('dotenv').config();

const app = express();
const corsOptions ={
    origin: ['http://localhost:3000', 'https://63605d2cbd600f000953ac84--eloquent-kataifi-0580d4.netlify.app/'],
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
        sameSite: process.env.ENVIRONMENT==="production" ? "none" : "lax",
    }
}));

app.use(canchaRoute)
app.use(AuthRoute)
app.use(TorneosRoute)
app.use(SubTorneosRoute)
app.use(TorneoParticipantesRoute)

app.get('/', (req, res) => {
    res.json("Hello")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
/* sequelize.authenticate().then(() => {
    console.log("Conexion exitosa a la BD");
}) */
})