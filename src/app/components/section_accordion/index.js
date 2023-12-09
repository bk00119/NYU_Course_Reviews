"use client"

import { MdExpandMore, MdExpandLess } from "react-icons/md"
import { useState } from "react"
import Link from "next/link"

export default function SectionAccordion({ course, section }) {
  const [isExpanded, setExpanded] = useState(false)
  const [reviewSummary, setReviewSummary] = useState(null)

  async function getReviewSummary() {
    const res = await fetch(
      `/api/section/getBriefCourseSectionReviews?section_id=${section._id}`,
      {
        method: "GET",
      }
    )
    const data = await res.json()
    console.log(data)
    setReviewSummary(data)
  }

  function hanldeAccordion() {
    setExpanded(!isExpanded)
    if (!reviewSummary) {
      getReviewSummary().catch(console.error)
    }
  }

  return (
    <tbody>
      <tr className="border-b-[1px]">
        <td className="p-4">
          <button
            className="w-full flex justify-between"
            onClick={hanldeAccordion}
          >
            <h4 className="text-xl">
              Section {section.section} - {section.instructor}
            </h4>
            {isExpanded ? (
              <MdExpandMore size="32px" />
            ) : (
              <MdExpandLess size="32px" />
            )}
          </button>

          {/* SHORT OVERVIEW OF THE SECTION REVIEWS */}
          <div className="ml-4 my-2">
          {isExpanded &&
            (reviewSummary ? (
              reviewSummary.count ? (
                <div className="flex flex-col items-end">
                  <div className="w-full">
                    <h5>
                      Average course rating:{" "}
                      {reviewSummary.avg_rating.toFixed(2)}/5.00
                    </h5>
                    <h5>Responded: {reviewSummary.count} student(s)</h5>
                  </div>
                  <button className="w-fit underline text-violet font-medium mr-2">View more</button>
                  <Link href={`./${course.full_code}/${section.semester}_${section.year}_${section.section}`} className="w-fit underline text-violet font-medium mr-2">View more</Link>
                </div>
              ) : (
                <h5>No reviews yet</h5>
              )
            ) : (
              <h5>Loading...</h5>
            ))}
            </div>
        </td>
      </tr>
    </tbody>
  )
}
