const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
//necessario para o browser aceitar
const cors = require('cors');

const database = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'senha',
        database: 'questlist'
    }
})

const app = express();
//middleware que transforma em json
app.use(bodyParser.json());
//necessario para o browser aceitar
app.use(cors());

app.post('/', (req, res) => {
    const { descricao } = req.body
    database('quests').insert({quest: descricao})
        .then(() => res.json("done"));
});

app.listen(3000);
