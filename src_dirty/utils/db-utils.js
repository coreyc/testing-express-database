const { Client } = require('pg')

const getConnection = () => {
  return {
    host: 'localhost',
    database: 'car_insurance',
    password: null,
    port: 5432
  }
}

const createTable = async function (tableName, name) {
  const client = new Client(getConnection())
  await client.connect()

  const res = await client.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, ${name} VARCHAR(50) not null);`)
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

const select = async function (tableName, limit = 'ALL', columns = '*') {
  const client = new Client(getConnection())
  await client.connect()

  const res = await client.query(`SELECT ${columns} FROM ${tableName} LIMIT ${limit}`)
  await client.end()
  return res
}

const selectOne = async function (tableName, itemName, columns = '*') {
  const client = new Client(getConnection())
  await client.connect()

  const res = await client.query(`SELECT ${columns} FROM ${tableName} WHERE name = '${itemName}'`)
  await client.end()
  return res
}

module.exports = {
  getConnection,
  createTable,
  insert,
  select,
  selectOne
}