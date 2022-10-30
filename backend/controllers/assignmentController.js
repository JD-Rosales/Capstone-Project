const Assignment = require('../models/assignmentModel')
const moment = require('moment');
// const User = require('../models/userModel')

// 
const addAssignment = async (req, res) => {
  try {
    const auth = req.user
    if(auth.role !== "teacher"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const { title, description, wordsArray, date, time} = req.body

    if(!title || title === ""){
      return res.status(400).json({ message: 'Assignment title is required'})
    } else if(!description || description === ""){
      return res.status(400).json({ message: 'Assignment description is required'})
    } else if(!wordsArray || !wordsArray.length){
      return res.status(400).json({ message: 'Please assign atleast 1 word/letter'})
    } else if(!date || !time){
      return res.status(400).json({ message: 'Date & Time is required'})
    }

    const currentDate = moment(new Date()).format()
    const deadline = date+'T'+time

    if(deadline < currentDate){
      return res.status(400).json({message: "Invalid Date/Time"})
    }

    await Assignment.create({
      user: auth.id,
      classCode: auth.userInfo.classCode,
      words: wordsArray,
      title: title,
      description: description,
      deadline: deadline,
    })

    const assignment = await Assignment.find({ "classCode": auth.userInfo.classCode }).lean()

    return res.status(200).json({ assignment })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const getAssignments = async () => {
  try {
    const auth = req.user

    if(auth.role !== "teacher"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const assignment = await Assignment.find({ "classCode": auth.classCode }).select('-password').lean()

    return res.status(200).json({ assignment })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  addAssignment
}