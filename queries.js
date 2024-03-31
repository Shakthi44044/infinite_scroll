const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chat_app',
  password: 'Shakthiopen12@',
  port: 5432,
})

const englishwords = (request, response) => {
const page = parseInt(request.query._page) || 1;
const limit = parseInt(request.query._limit) || 10;
const offset = (page - 1) * limit;
  pool.query('SELECT * FROM englishwords ORDER BY words ASC LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



module.exports = {
  englishwords,
 
}
