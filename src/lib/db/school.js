import clientPromise from "@lib/db"

let client
let db
let schools

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    schools = db.collection("schools")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

export async function getSchools() {
  try {
    if (!schools) await init()
    const res = await schools.find({}).toArray()
    return { data: res }
  } catch (error) {
    return { error: "Failed to fetch schools." }
  }
}

export async function getSchool(){
  return { data: {}}
}
