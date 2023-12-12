"use client"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateCourse } from "@/lib/store"
import PageDir from "@components/pageDir"
import LoadArrayResult from "@components/loadArrayResult"

export default function SubjectPage() {
  const dispatch = useDispatch()
  const subject = useSelector(({ courseDetails: { subject } }) => {
    return subject
  })

  const [courseList, setCourseList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getCourses() {
      const res = await fetch(
        `/api/subject/getSubjectCourses?subject_id=${subject._id}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      setCourseList(data)
      setLoading(false)
    }

    if (isLoading && subject) {
      getCourses().catch(console.error)
    }
    // if (!subject) {
    // }
  }, [subject])

  function handleCourseChange(val) {
    dispatch(updateCourse(val))
  }

  return (
    <div>
      <PageDir />
      <LoadArrayResult
        isLoading={isLoading}
        data={courseList}
        message="No course"
      >
        <div className="w-full grid md:grid-cols-2">
          {courseList.map((course, index) => (
            <div className="w-full mb-4" key={index}>
              <Link
                href={`./${subject.code}: ${subject.name}/${course.full_code}`}
                onClick={() => handleCourseChange(course)}
                className="border-b border-black text-xl"
              >
                {course.name}
              </Link>
            </div>
          ))}
        </div>
      </LoadArrayResult>
      {/* <div className="w-full grid grid-cols-2">
        {courseList.map((course, index) => (
          <div className="w-full my-2" key={index}>
            <Link
              href={`./${subject.code}: ${subject.name}/${course.full_code}`}
              onClick={() => handleCourseChange(course)}
              className="border-b border-black text-xl"
            >
              {course.name}
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  )
}
