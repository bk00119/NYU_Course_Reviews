import { createSlice } from "@reduxjs/toolkit"

const courseSlice = createSlice({
  name: "course",
  initialState: {
    school: null,
    subject: null,
    course: null,
  },
  reducers: {
    updateSchool(state, action) {
      state.school = action.payload
    },
    resetSchool(state, action) {
      state.school = {}
    },
    updateSubject(state, action) {
      state.subject = action.payload
    },
    resetSubject(state, action) {
      state.subject = {}
    },
    updateCourse(state, action) {
      state.course = action.payload
    },
    resetCourse(state, action) {
      state.course = {}
    },
  },
})

export const {
  updateSchool,
  resetSchool,
  updateSubject,
  resetSubject,
  updateCourse,
  resetCourse,
} = courseSlice.actions
export const courseReducer = courseSlice.reducer
