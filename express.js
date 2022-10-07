const express = require('express');
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config.js')[process.env.NODE_ENV||"dev"]
const {Client} = require('pg');
app.use(cors())
app.use(bodyParser())
app.use(express.static('public'))
const client = new Client({
    connectionString:"postgres://postgres:docker@localhost:5432/memo_db"
});
client.connect();

app.get('/api/memo', (req, res) => {
    client.query('SELECT * FROM memo_table').then((result) => {
       res.setHeader('Content-Type', 'application/json');
       res.send(result.rows);  
    })
})

app.post('/api/memo', (req, res) => {
    let newComment = req.body
    client.query("INSERT INTO memo_table(description) VALUES ($1);",[newComment.description]).then((data)=>{
        res.send(newComment)
        
    });
});

app.delete('/api/memo',(req, res)=>{
    let id = req.body.id; 
    client.query('DELETE FROM memo_table WHERE memo_id = $1',[id]).then((data) =>{
        
        res.send()
    })
});


app.listen(PORT, () =>{
    console.log('Listening on port: ', PORT);
});