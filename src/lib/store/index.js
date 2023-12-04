import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import { reviewReducer, updateYear } from "./slices/reviewSlice"
import {
  courseReducer,
  updateSchool,
  resetSchool,
  updateSubject,
  resetSubject,
  updateCourse,
  resetCourse,
} from "./slices/courseSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      review: reviewReducer,
      course: courseReducer,
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
}
