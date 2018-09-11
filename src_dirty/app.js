const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const {users} = require('./routes/users')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))
app.post('/api/users', users)

app.listen(3000, () => console.log('Example app listening on port 3000!'))