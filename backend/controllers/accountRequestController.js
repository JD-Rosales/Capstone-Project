const AccountRequest = require('../models/accountRequest')

//POST api/accountRequest/
const setaccountRequest = async (req, res) => {

  try {
    const accountRequest = await AccountRequest.create({
      //user is from middleware token
      // user: req.user.id,
      teacherID: req.body.teacherID,
      username: req.body.username,
      status: req.body.status
    })
    res.status(200).json(accountRequest)
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  setaccountRequest
}