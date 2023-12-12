"use client"

import { Formik, Form, Field } from "formik"
import { useState } from "react"
import { useRouter } from "next/navigation"

import SectionTitle from "@components/sectionTitle"
import DropdownQuestion from "@components/dropdownQuestion"
import FixedQuestion from "@components/fixedQuestion"
import SectionDivider from "@components/sectionDivider"
import Rating from "@components/rating"

export default function CourseSectionReviewForm(props) {
  const router = useRouter()
  const letter_grade_options = [
    "",
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
    "P",
    "Withdrew",
  ]
  const [courseRating, setCourseRating] = useState(null)
  const [difficultyLevel, setDifficultyLevel] = useState(null)

  return (
    <div className="mb-12">
      <Formik
        initialValues={{
          comment: "",
          grade: "",
        }}
        onSubmit={async (values) => {
          if (!courseRating) {
            alert("Please rate the course")
            return
          }
          if (!difficultyLevel) {
            alert("Please rate the level of difficulty")
            return
          }
          if (values.comment?.length === 0) {
            alert("Please write a comment")
            return
          }

          const grade = values.grade?.length === 0 ? null : values.grade

          const res = await fetch(
            "/api/course_section_review/postCourseSectionReview",
            {
              method: "POST",
              body: JSON.stringify({
                section_id: props.section._id,
                rating: courseRating,
                difficulty_level: difficultyLevel,
                grade: grade,
                comment: values.comment,
              }),
            }
          )
          console.log(res.status)
          if (res.status === 201) {
            router.back()
          } else {
            alert("NETWORK ERROR: Your review is not saved")
          }
        }}
      >
        {({ errors, touched }) => (
          <Form
            // className={styles.formInnerContainer}
            className="w-full"
            name="contact"
            method="POST"
            data-netlify="true"
          >
            {/* SENDER MESSAGE FIELD */}
            <div className="mb-8">
              {/* COURSE SECTION SUMMARY */}
              <FixedQuestion title="Year" val={props.section.year} />
              <FixedQuestion title="Semester" val={props.section.semester} />
              <FixedQuestion title="Section" val={props.section.section} />
              <FixedQuestion
                title="Instructor"
                val={props.section.instructor}
              />
              <SectionDivider className="mb-4" />

              {/* COURSE RATING */}
              <div className="flex mb-4 flex-col md:flex-row">
                <SectionTitle className="mb-0">Course Rating*</SectionTitle>
                <Rating
                  rating={courseRating}
                  setRating={setCourseRating}
                  options={["Awful", "Bad", "Ok", "Good", "Awesome"]}
                />
              </div>

              {/* LEVEL OF DIFFICULTY */}
              <div className="flex mb-4 flex-col md:flex-row">
                <SectionTitle className="mb-0">
                  Level of Difficulty*
                </SectionTitle>
                <Rating
                  rating={difficultyLevel}
                  setRating={setDifficultyLevel}
                  options={[
                    "Very easy",
                    "Easy",
                    "Average",
                    "Hard",
                    "Very hard",
                  ]}
                  reverse={true}
                />
              </div>

              {/* GRADE */}
              <DropdownQuestion
                title="Grade"
                name="grade"
                options={letter_grade_options}
                styles="flex items-center mb-2"
                titleStyles="mb-0"
                fieldStyles="border rounded ml-4 pl-2 pr-4 py-2 outline-none"
              />

              {/* COMMENT */}
              <SectionTitle>Comment</SectionTitle>
              <Field
                name="comment"
                as="textarea"
                className="border w-full p-2 outline-none h-32"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="w-full text-center">
              <button
                type="submit"
                className="text-xl p-3 bg-violet text-white rounded-lg hover:bg-violet-focus"
              >
                Submit review
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
