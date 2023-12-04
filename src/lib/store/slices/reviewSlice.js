import { createSlice } from "@reduxjs/toolkit"

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    year: "",
    semester: "",
    section: "",
    course_rating: 0,
    level: 0,
    grade: "",
    comment: "",
    syllabus: null,
  },
  reducers: {
    updateYear(state, action) {
      state.year = action.payload
    },
  },
})

export const { updateYear } = reviewSlice.actions
export const reviewReducer = reviewSlice.reducer
