'use client'

import PageDir from "@components/pageDir";
import { useDispatch, useSelector } from "react-redux";

export default function CoursePage(){
  const dispatch = useDispatch()
  const course = useSelector((state)=>{
    return state.courseDetails.course
  })
  
  return (
    <div>
      <PageDir />
      CoursePage
    </div>
  )
}