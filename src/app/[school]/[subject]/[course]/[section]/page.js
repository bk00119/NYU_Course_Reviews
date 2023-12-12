"use client"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import PageDir from "@components/pageDir"
import SectionTitle from "@components/sectionTitle"

export default function SectionPage() {
  const section = useSelector((state) => {
    return state.courseDetails.section
  })

  const [reviewsData, setReviewsData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getReviews() {
      const res = await fetch(
        `/api/section/getCourseSectionReviews?section_id=${section._id}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      setReviewsData(data)
      setLoading(false)
    }

    if (isLoading && section) {
      getReviews().catch(console.error)
    }
  }, [section])

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <div>
      <PageDir />
      {section && reviewsData && (
        <div>
          {/* INSTRUCTOR INFORMATION */}
          <div className="mb-4">
            <SectionTitle>Instructor</SectionTitle>
            <h4 className="text-xl mb-2">{section.instructor}</h4>
          </div>

          {/* SYLLABUS */}

          {/* COURSE RATINGS SUMMARY */}
          <div className="mb-4">
            <SectionTitle>Course Ratings Summary</SectionTitle>
            <div>
              <h4 className="text-xl mb-2">
                Overall course rating: {reviewsData.avg_rating.toFixed(2)}/5.00
              </h4>
              <h4 className="text-xl mb-2">
                Level of difficulty: {reviewsData.difficulty_level.toFixed(2)}
                /5.00
              </h4>
              <h4 className="text-xl mb-2">
                Number of students responded: {reviewsData.count} students
              </h4>
            </div>
          </div>

          {/* STUDENT REVIEWS */}
          <div className="mb-4">
            <SectionTitle>Student Reviews</SectionTitle>
            {reviewsData.reviews.map((review) => (
              <div
                key={review._id}
                className="text-lg p-4 mb-4 bg-gray-100 rounded"
              >
                {/* TOP: COURSE RATING & DATE */}
                <div className="flex justify-between mb-1">
                  <h4>Course rating: {review.rating}/5</h4>
                  <h4>{dateFormatter.format(new Date(review.date))}</h4>
                </div>
                <h4 className="mb-1">
                  Level of difficulty: {review.difficulty_level}/5
                </h4>
                {review.grade && (
                  <h4 className="mb-1">Grade: {review.grade}</h4>
                )}
                <div className="flex">
                  <h4 className="mr-1">Comment:</h4>
                  <h4>{review.comment}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
