import { getSubjects } from "@/lib/db/subject"

export async function GET(req) {
  try {
    const { data, error } = await getSubjects()
    if (error) throw new Error(error)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
