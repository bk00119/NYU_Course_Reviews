import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import { reviewReducer, updateYear } from "./slices/reviewSlice"
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
      review: reviewReducer,
      courseDetails: courseDetailsReducer,
    },
  })
}

export const wrapper = createWrapper(makeStore)

export {
  updateYear,
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
