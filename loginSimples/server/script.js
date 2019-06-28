const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const app = express();

app.use(bodyParser.json());
app.use(cors());
/* app.use(bodyParser.urlencoded({
    extended: true
  })); */

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'senha',
        database: 'loginsimples'
    }
});

//verificar login
app.put('/users', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json('Dados recebidos estão incorretos ou incompletos!');
    } else {
        db('users').where({
            email: email
        })
            .then(data => {
                if(data[0].password === password){
                    return res.json(data[0]); //data[0] porque vem em forma de lista mesmo com um ÚNICO objeto de retorno
                } else {
                    return res.json("Usuario ou senha incorreto!")
                }
            })
            .catch(err => res.status(400).json('Usuario não encontrado!'));
    }
})

//registra usuário
app.post('/users', (req, res) => {
    const {nome, email, password } = req.body;
    if(!email || !nome || !password){
        //OBRIGADO COLOCAR O RETURN assim o resto não roda!!
        return res.status(400).json('incorrect form submission');
    } else {
        db('users').insert({name: nome, email: email, password: password, joined: new Date()})
            .then(()=>res.json("Tudo Certo!"));
    }
});

app.listen(3000);