const { insert } = require('../utils/db-utils')

const createUser = async (userName, userType) => {
  if (userType === 'admin') {
    // if userType is admin, create user in 'admin' table
    await insert('admin', userName)
  } else if (userType === 'user') {
    // if userType is user, create user in 'user' table
    await insert('user', userName)
  }
}

module.exports = {
  createUser
}