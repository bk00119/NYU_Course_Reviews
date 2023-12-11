import clientPromise from "@lib/db"
import { ObjectId } from "mongodb"

let client
let db
let course_section_reviews

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    course_section_reviews = db.collection("course_section_reviews")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

export async function postCourseSectionReview({
  section_id,
  rating,
  difficulty_level,
  grade,
  comment
}) {
  try {
    if (!course_section_reviews) await init()
    const res = await course_section_reviews.insertOne({
      course_section_id: new ObjectId(section_id),
      rating: rating,
      difficulty_level: difficulty_level,
      grade: grade,
      comment: comment,
      date: new Date()
    })
    return { data: res }
  } catch (error) {
    return {
      error: `Failed to insert a review for course section ${section_id}.`,
    }
  }
}