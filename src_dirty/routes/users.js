const { Client } = require('pg')

const getConnection = () => {
  return {
    host: 'localhost',
    database: 'usertype',
    password: null,
    port: 5432
  }
}

const createTable = async function (tableName) {
  const client = new Client(getConnection())
  await client.connect()

  const res = await client.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, user_name VARCHAR(25) not null);`)
  await client.end()
  return res
}

// Express route - Users
const users = async (req, res) => {
  const userName = req.body.user_name
  const tableName = req.body.table_name
  const client = new Client(getConnection())
  await client.connect()

  try {
    const response = await client.query(`INSERT INTO ${tableName} (user_name) VALUES ('${userName}');`)
    await client.end()
    if (response.rowCount === 1) {
      res.set('Content-Type', 'application/json')
      res.sendStatus(201)
    } else {
      res.sendStatus(404)
    }
  } catch(e) {
    res.sendStatus(500)
    console.log(e)
  }
}

module.exports = {
  createTable,
  users
}