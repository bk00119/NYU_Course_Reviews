import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import {
  updateSchool,
  resetSchool,
  updateSubject,
  resetSubject,
  updateCourse,
  resetCourse,
  updateSection,
  resetSection,
  updateReviews,
  resetReviews,
  courseDetailsReducer,
} from "./slices/courseSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      courseDetails: courseDetailsReducer,
    },
  })
}

export const wrapper = createWrapper(makeStore)

export {
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
}
