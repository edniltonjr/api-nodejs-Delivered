const express = require('express') 
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const { entradaRouter } = require('./routes/entrada_merc')
const { fornecedorRouter } = require('./routes/fornecedor')
const { estoqueRouter } = require('./routes/estoque')
const { produtoRouter } = require('./routes/produto')
const { categoriaRouter } = require('./routes/categoria')

const { adminRouter } = require('./routes/admin')
const { auth } = require('./routes/authenticate')

const { adminMiddleware, jwtVerify } = require('./middleware/admin')
const { help } = require('./middleware/help')

app.use(cors())
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());
app.use(help)


//ROTAS//
app.use('/mercadorias', jwtVerify, entradaRouter)
app.use('/fornecedores', jwtVerify, fornecedorRouter)
app.use('/estoques', jwtVerify, estoqueRouter)
app.use('/produtos', jwtVerify, produtoRouter)
app.use('/categorias', jwtVerify, categoriaRouter)

app.use('/auth', auth)
app.use('/admin', jwtVerify, adminRouter)

app.use((req, res) => {
    res.status(404).send("Page not found !!!")
})

module.exports.app = app;
