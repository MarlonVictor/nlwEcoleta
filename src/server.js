const express = require('express')
const server = express()


// config public
server.use(express.static('public'))


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
    return res.render('create-point.html')
})

server.get('/search', (req, res) => {
    return res.render('search-results.html')
})


// config porta
server.listen(3000)