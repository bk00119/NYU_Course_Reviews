import clientPromise from "@lib/db"
import { ObjectId } from "mongodb"

let client
let db
let courses

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    courses = db.collection("courses")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

export async function getCourses() {
  try {
    if (!courses) await init()
    const res = await courses.find({}).toArray()
    return { data: res }
  } catch (error) {
    return { error: "Failed to fetch courses." }
  }
}

export async function getSubjectCourses({ subject_id }) {
  try {
    if (!courses) await init()
    const res = await courses
      .find({ subject_id: new ObjectId(subject_id) })
      // to reduce the size of document data
      // .project({ name: 1, full_code: 1, subject_id: 1})
      .toArray()
    return { data: res }
  } catch (error) {
    return { error: `Failed to fetch courses of subject(${subject_id}).` }
  }
}

export async function getCourseByFullCode({ full_code }) {
  try {
    if(!courses) await init()
    const res = await courses
      .findOne({ full_code: full_code })
      return { data: res }
  } catch (error) {
    return { error: `Failed to fetch course details of ${full_code}.`}
  }
}