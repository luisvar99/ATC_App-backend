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

app.use(cors());
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