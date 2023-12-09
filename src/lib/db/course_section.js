import clientPromise from "@lib/db"
import { ObjectId } from "mongodb"

let client
let db
let course_sections

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    course_sections = db.collection("course_sections")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

export async function getCourseSections({ course_id }) {
  try {
    if (!course_sections) await init()
    const res = await course_sections
      // .find({ course_id: new ObjectId(course_id) })
      // .toArray()
      .aggregate([
        {
          $match: { course_id : new ObjectId(course_id) }
        },
        {
          $group: {
            _id: {
              year: "$year",
              semester: "$semester",
            },
            sections: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            semester: "$_id.semester",
            sections: 1
          }
        },
        {
          $sort: {
            year: 1,
            semester: 1
          }
        }
      ])
      .toArray()
    return { data: res }
  } catch (error) {
    return { error: `Failed to fetch sections of course(${course_id}).` }
  }
}
