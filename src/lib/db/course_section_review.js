import clientPromise from "@lib/db"
import { ObjectId } from "mongodb"

let client
let db
let course_sections_reviews

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    course_sections_reviews = db.collection("course_section_reviews")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

export async function getBriefCourseSectionReviews({ course_section_id }) {
  try {
    if (!course_sections_reviews) await init()
    const res = await course_sections_reviews
      // .find({ course_id: new ObjectId(course_id) })
      // .toArray()
      .aggregate([
        {
          $match: { course_section_id: new ObjectId(course_section_id) },
        },
        {
          $group: {
            _id: {
              course_section_id: "$course_section_id",
            },
            avg_rating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            avg_rating: 1,
            count: 1,
          },
        },
      ])
      .toArray()

    // if no data found
    if (res.length == 0) {
      // throw new Error()
      return { data: {} }
    }
    return { data: res[0] }
  } catch (error) {
    return {
      error: `Failed to fetch brief reviews of course section (${course_section_id}).`,
    }
  }
}
