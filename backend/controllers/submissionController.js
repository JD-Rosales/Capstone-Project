const Submission = require('../models/submissionModel')
const Assignment = require('../models/assignmentModel')
const moment = require('moment');

const addSubmission = async (req, res) => {
  try {

    const auth = req.user
    if(auth.role !== "student"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const { assignmentID, timeLeft, score, date } = req.body

    if(!assignmentID || !timeLeft || !score || !date){
      return res.status(400).json({message: "Please input all required fields"})
    }

    const submission = await Submission.create({
      user: auth.id,
      timeLeft: timeLeft,
      score: score,
      date: moment(date).format()
    })

    if(submission){
      await Assignment.findOneAndUpdate(
        { _id: assignmentID },
        { $addToSet: { submissions: {student: auth.id, submission: submission._id } } }
      )
  
      return res.status(200).json({ message: "Success" })
    }
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "An error has occured"})
  }
}

const getSubmision = async () => {
  try {

    console.log("test");
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  addSubmission
}