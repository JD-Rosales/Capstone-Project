const TeacherAssignment = require('../models/teacherAssignmentModel')
// const User = require('../models/userModel')

// 
const addAssignment = async (req, res) => {
  try {

    const auth = req.user

    // if(auth.role !== "teacher"){
    //   return res.status(401).json({message: "Unauthorized"})
    // }

    console.log(auth.id)

    const assignment = await TeacherAssignment.create({
      user: auth.id,
      classCode: "tq2mnXyP",
      words: ["test", "test2", "test3"],
      title: "Title Test",
      description: "Test Description",
      deadline: "2022-10-24T23:10:57+08:00",
    })

    return res.status(200).json({ assignment })

    // return res.status(200).json({user: auth})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "Unauthorized, invalid credentials"})
  }
} 

module.exports = {
  addAssignment
}