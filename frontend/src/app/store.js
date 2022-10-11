import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import teacherReducer from "../features/teacher/teacherSlice"
import studentReducer from "../features/student/studentSlice"
import adminReducer from "../features/admin/adminSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
    student: studentReducer,
    admin: adminReducer,
  }
})