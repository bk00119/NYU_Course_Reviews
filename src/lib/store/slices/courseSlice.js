import { createSlice } from "@reduxjs/toolkit"

const courseDetailsSlice = createSlice({
  name: "courseDetails",
  initialState: {
    school: null,
    subject: null,
    course: null,
    section: null,
  },
  reducers: {
    updateSchool(state, action) {
      state.school = action.payload
    },
    resetSchool(state, action) {
      state.school = null
    },
    updateSubject(state, action) {
      state.subject = action.payload
    },
    resetSubject(state, action) {
      state.subject = null
    },
    updateCourse(state, action) {
      state.course = action.payload
    },
    resetCourse(state, action) {
      state.course = null
    },
    updateSection(state, action){
      state.section = action.payload
    },
    resetSection(state, action){
      state.section = null
    }
  },
})

export const {
  updateSchool,
  resetSchool,
  updateSubject,
  resetSubject,
  updateCourse,
  resetCourse,
  updateSection,
  resetSection
} = courseDetailsSlice.actions
export const courseDetailsReducer = courseDetailsSlice.reducer
