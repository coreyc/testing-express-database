const { createUser } = require('../services/user-service')

// Express route - Users
const users = async (req, res) => {
  const userName = req.body.user_name
  const userType = req.body.user_type
  try {
    await createUser(userName, userType)
    res.sendStatus(201)
  } catch(e) {
    res.sendStatus(500)
    console.log(e)
  }
}

module.exports = {
  users
}