import express from 'express'

import './config/env.js'
/* 
import connectDB from './config/db.js' */
import  connectDB  from './config/db.js'

import userRoutes from './routes/user.routes.js'

const app = express()

app.use(express.json())

connectDB()

app.use(userRoutes)

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";
    console.error(`[ERROR] ${status}: ${message}`);
    res.status(status).json({ error: message });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado en puerto ${process.env.PORT}`)
})