import { createSlice } from "@reduxjs/toolkit"

const courseDetailsSlice = createSlice({
  name: "courseDetails",
  initialState: {
    school: null,
    subject: null,
    course: null,
    section: null,
    reviews: null
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
    },
    updateReviews(state, action) {
      state.reviews = action.payload
    },
    resetReviews(state, action) {
      state.reviews = null
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
  resetSection,
  updateReviews,
  resetReviews
} = courseDetailsSlice.actions
export const courseDetailsReducer = courseDetailsSlice.reducer
