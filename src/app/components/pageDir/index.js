"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import {
  updateSchool,
  updateSubject,
  updateCourse,
  updateSection,
  resetSection,
} from "@/lib/store"
import { useEffect } from "react"

export default function PageDir() {
  // change to using reducer
  const dispatch = useDispatch()
  const params = useParams()

  const school_name = params.school
  const subject = params.subject
  const course_full_code = params.course
  const section_term_code = params.section

  // const [courseSectionData, setCourseSectionData] = useState(null)

  const courseDetails = useSelector(({ courseDetails }) => {
    return courseDetails
  })

  useEffect(() => {
    async function getSchool(name) {
      const res = await fetch(`/api/school/getSchool?school_name=${name}`, {
        method: "GET",
      })
      const data = await res.json()
      dispatch(updateSchool(data))
    }

    async function getSubject(code) {
      const res = await fetch(
        `/api/subject/getSubjectByCode?subject_code=${code}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      dispatch(updateSubject(data))
    }

    async function getCourse(full_code) {
      const res = await fetch(
        `/api/course/getCourseByFullCode?full_code=${full_code}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      dispatch(updateCourse(data))
    }

    async function getSection(course_id, semester, year, section_code) {
      const res = await fetch(
        `/api/section/getSectionByTerm?course_id=${course_id}&semester=${semester}&year=${year}&section_code=${section_code}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      dispatch(updateSection(data))
    }

    if (school_name && !courseDetails?.school) {
      getSchool(school_name)
    }
    if (subject && !courseDetails?.subject) {
      const [subject_code, subject_name] = decodeURIComponent(
        params.subject
      ).split(": ")
      getSubject(subject_code)
    }
    if (course_full_code && !courseDetails?.course) {
      getCourse(course_full_code)
    }
    if (section_term_code && courseDetails?.course && !courseDetails?.section) {
      const { semester, year, section_code } = splitSectionData()
      getSection(courseDetails.course._id, semester, year, section_code)
    }
    if (!section_term_code) {
      // if on course page, reset section
      dispatch(resetSection())
    }
  }, [courseDetails, school_name, subject, course_full_code])

  function splitSectionData() {
    const [semester, year, section_code] = decodeURIComponent(
      params.section
    ).split("_")
    return { semester, year, section_code }
  }

  return (
    <div className="mb-4">
      <div className="text-2xl font-bold mb-6">
        <Link href="/" className="border-b-2 border-black">
          Schools
        </Link>
        {school_name && (
          <>
            {" / "}
            <Link href={`/${school_name}`} className="border-b-2 border-black">
              {decodeURIComponent(school_name)}
            </Link>
          </>
        )}
        {subject && (
          <>
            {" / "}
            <Link
              href={`/${school_name}/${subject}`}
              className="border-b-2 border-black"
            >
              {decodeURIComponent(subject)}
            </Link>
          </>
        )}
      </div>

      {/* COURSE FULL_CODE & NAME & WRITE A REVIEW BUTTON */}
      {course_full_code && courseDetails.course && (
        <div className="flex justify-between items-start flex-col mb-4 md:flex-row md:items-center">
          <h1 className="text-2xl mb-4 md:mb-0">
            <Link
              href={`/${school_name}/${subject}/${course_full_code}`}
              className="border-b-2 border-black"
            >
              {courseDetails.course.full_code}: {courseDetails.course.name}
            </Link>
            {section_term_code && courseDetails.section && (
              <>
                {" / "}
                <Link
                  href={`/${school_name}/${subject}/${course_full_code}/${section_term_code}`}
                  className="border-b-2 border-black"
                >
                  {courseDetails.section.semester} {courseDetails.section.year}{" "}
                  (Section {courseDetails.section.section})
                </Link>
              </>
            )}
          </h1>

          {/* WRITE A REVIEW - Link */}
          {section_term_code && courseDetails.section && (
            <Link
              href={`/review/course_section?course_id=${courseDetails.course._id}&section_id=${courseDetails.section?._id}`}
              className="p-2 bg-violet text-white rounded"
            >
              Write a review
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
