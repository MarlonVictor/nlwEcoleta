// import da depentencia
const sqlite3 = require('sqlite3').verbose()

// Criando o objeto que irá fazer operações no BD
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db
// Utilizando o objeto com SQL
// db.serialize(() => {

//     // Criando tabelas
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // Inserindo dados
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         'https://images.pexels.com/photos/167538/pexels-photo-167538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//         'Papersider',
//         'Guilherme Gemballa, Jardim América',
//         'Número 260',
//         'Santa Catarina',
//         'Rio do Sul',
//         'Papéis de Papelão'
//     ]

//     function afterInsertData(error) {
//         if(error) {
//             return console.log(error)
//         } else {
//             console.log('Cadastrado com sucesso')
//             console.log(this)
//         }
//     }

    //db.run(query, values, afterInsertData)


    // Consultando os dados
    // db.all(`SELECT * FROM places`, function(error, rows) {
    //     if(error) {
    //         return console.log(error)
    //     } else {
    //         console.log('Aqui estão seus registros')
    //         console.log(rows)
    //     }
    // })

    //Deletar um dado
    // db.run(`DELETE FROM places WHERE id = ?`, [5],function(error) {
    //     if(error) {
    //         return console.log(error)
    //     } else {
    //         console.log('Registro deletado com sucesso:')
    //     }
    // })
//})