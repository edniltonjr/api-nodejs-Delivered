require('dotenv').config()
const { app } = require('./src/server')

app.listen(process.env.PORT | 3000, ()=>{
    console.log(`Servidor online ! ${process.env.PORT}`)
})