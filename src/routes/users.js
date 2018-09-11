const users = (req, res) => {
  console.log(req.body.user_name)
  res.send(req.body.user_name)
}

module.exports = {
  users
}