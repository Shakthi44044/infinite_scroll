const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 9001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/englishwords', db.englishwords)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})