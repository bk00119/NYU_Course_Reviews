"use client"

import CourseSectionReviewForm from "@/app/components/courseSectionReviewForm"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function CourseSectionReviewPage(props) {
  const searchParams = useSearchParams()
  // const router = useRouter()

  const course_id = searchParams.get("course_id")
  const section_id = searchParams.get("section_id")

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   router.back()
  // }

  const [course, setCourse] = useState(null)
  const [section, setSection] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getCourseSectionData() {
      const course_res = await fetch(
        `/api/course/getCourseById?course_id=${course_id}`,
        {
          method: "GET",
        }
      )
      const course_data = await course_res.json()
      setCourse(course_data)

      const section_res = await fetch(
        `/api/section/getSectionById?section_id=${section_id}`,
        {
          method: "GET",
        }
      )
      const section_data = await section_res.json()
      setSection(section_data)

      setLoading(section_data)
    }

    if (isLoading && course_id && section_id) {
      getCourseSectionData().catch(console.error)
    }
  }, [course_id, section_id])

  return (
    course &&
    section && (
      <div>
        {/* COURSE FULL_CODE & NAME */}
        <h3 className="text-2xl font-bold mb-4">Rate: {course.full_code} - {course.name}</h3>
        <CourseSectionReviewForm section={section} />
      </div>
    )
  )
}
