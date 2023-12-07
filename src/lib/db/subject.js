import clientPromise from "@lib/db"
import { ObjectId } from "mongodb"

let client
let db
let subjects

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    subjects = db.collection("subjects")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

export async function getSubjects() {
  try {
    if (!subjects) await init()
    const res = await subjects.find({}).toArray()
    return { data: res }
  } catch (error) {
    return { error: "Failed to fetch subjects." }
  }
}

export async function getSubjectByCode({ subject_code }) {
  try {
    if (!subjects) await init()
    const res = await subjects.findOne({ code: subject_code })
    return { data: res }
  } catch (error) {
    return { error: `Failed to fetch a subject(${subject_code}).` }
  }
}

export async function getSchoolSubjects({ school_id }) {
  try {
    if (!subjects) await init()
    const res = await subjects
      .find({ school_id: new ObjectId(school_id) })
      .toArray()
    return { data: res }
  } catch (error) {
    return { error: `Failed to fetch subjects at school(${school_id}).` }
  }
}
