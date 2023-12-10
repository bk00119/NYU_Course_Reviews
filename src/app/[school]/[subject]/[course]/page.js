"use client"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateSection } from "@/lib/store"
import PageDir from "@components/pageDir"
import SectionAccordion from "@components/section_accordion"
import SectionTitle from "@/app/components/sectionTitle"

export default function CoursePage() {
  const course = useSelector((state) => {
    return state.courseDetails.course
  })

  const [sectionList, setSectionList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getSections() {
      const res = await fetch(
        `/api/course/getCourseSections?course_id=${course._id}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      setSectionList(data)
      setLoading(false)
    }

    if (isLoading && course) {
      getSections().catch(console.error)
    }
  }, [course])

  // function handleSectionChange(val) {
  //   dispatch(updateSection(val))
  // }

  return (
    <div>
      <PageDir />
      {course && (
        <div>
          {/* COURSE GENERAL INFO */}
          <div className="text-xl mb-4">
            <SectionTitle>General Information</SectionTitle>
            <ul className="ps-8 list-disc list-outside">
              <li>Units: {course.units}</li>
              <li>
                Prerequisites
                <ul className="ps-6 list-disc list-outside">
                  {course.pre_reqs.map((pre_req) => (
                    <li key={pre_req}>{pre_req}</li>
                  ))}
                </ul>
              </li>
              <li>Description: {course.description}</li>
            </ul>
          </div>

          {/* LIST OF SECTIONS */}
          <div>
            {sectionList.map((term, index) => (
              <div key={index} className="mb-4">
                {/* SECTION TERM (SEMESTER/YEAR) */}
                <SectionTitle>{term.semester} {term.year}</SectionTitle>
                <table className="mt-2 border-[1px] border-collapse w-full ">
                  {term.sections.map((section) => (
                    <SectionAccordion
                      course={course}
                      section={section}
                      key={section._id}
                    />
                  ))}
                </table>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
