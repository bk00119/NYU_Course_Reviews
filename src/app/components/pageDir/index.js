"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { updateSchool, updateSubject, updateCourse } from "@/lib/store"
import { useEffect } from "react"

export default function PageDir() {
  // change to using reducer
  const dispatch = useDispatch()
  const params = useParams()

  const school_name = params.school
  const subject = params.subject
  const course_full_code = params.course

  const courseDetails = useSelector(({courseDetails}) => {
    return courseDetails
  })

  useEffect(()=> {
    async function getSchool(name) {
      const res = await fetch(`/api/school/getSchool?school_name=${name}`, {
        method: "GET",
      })
      const data = await res.json()
      dispatch(updateSchool(data))
    }

    async function getSubject(code){
      const res = await fetch(`/api/subject/getSubjectByCode?subject_code=${code}`, {
        method: "GET",
      })
      const data = await res.json()
      dispatch(updateSubject(data))
    }

    async function getCourse(full_code){
      const res = await fetch(`/api/course/getCourseByFullCode?full_code=${full_code}`, {
        method: "GET"
      })
      const data = await res.json()
      dispatch(updateCourse(data))
    }

    if(school_name && !courseDetails?.school){
      getSchool(school_name)
    }
    if(subject && !courseDetails?.subject){
      const [ subject_code, subject_name ] = decodeURIComponent(params.subject).split(": ")
      getSubject(subject_code)
    }
    if(course_full_code && !courseDetails?.course){
      getCourse(course_full_code)
    }
  }, [school_name, subject, course_full_code])

  return (
    <div className="text-2xl font-bold mb-4">
      <Link href="/" className="border-b-2 border-black">
        Schools
      </Link>
      {school_name && (
        <>
          {" / "}
          <Link href={`/${school_name}`} className="border-b-2 border-black">{decodeURIComponent(school_name)}</Link>
        </>
      )}
      {subject && (
        <>
          {" / "}
          <Link href={`/${school_name}/${subject}`} className="border-b-2 border-black">{decodeURIComponent(subject)}</Link>
        </>
      )}
    </div>
  )
}
