const { Client } = require('pg')

const getConnection = () => {
  return {
    host: 'localhost',
    database: 'autoparts',
    password: null,
    port: 5432
  }
}

const createTable = async function (tableName) {
  const client = new Client(getConnection())
  await client.connect()

  const res = await client.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, user_name VARCHAR(50) not null);`)
  await client.end()
  return res
}

const insert = async (tableName, userName) => {
  const client = new Client(getConnection())
  await client.connect()

  const res = await client.query(`INSERT INTO ${tableName} (user_name) VALUES ('${userName}');`)
  await client.end()
  return res
}

module.exports = {
  createTable,
  insert
}