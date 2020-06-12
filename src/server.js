const express = require('express')
const server = express()

// pegar banco de dados
const db = require('./database/db')


// config pasta public
server.use(express.static('public'))


// habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))


// template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})


// config rotas
server.get('/', (req, res) => {
    return res.render('index.html')
})

server.get('/create-point', (req, res) => {
    req.query
    return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {

    // Criando tabelas
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // Inserindo dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [ // req.body = corpo do form
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(error) {
        if(error) {
            console.log(error)
            return res.render('create-point.html', {error: true})
        } else {
            console.log('Cadastrado com sucesso')
            console.log(this)

            return res.render('create-point.html', {saved: true})
        }
    }

    db.run(query, values, afterInsertData)
})


server.get('/search', (req, res) => {
    const search = req.query.search

    if(search == '') //pesquisa vazia
        return res.render('search-results.html', {total: 0})

    // pegando os dados do db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows) {
        if(error)
            return console.log(error)
        
        const total = rows.length
        // mostrar a pg html com os dados do db
        return res.render('search-results.html', {places: rows, total: total})
    })
})


// config porta
server.listen(3000)