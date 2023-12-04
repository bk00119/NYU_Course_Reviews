import { getSchool } from "@/lib/db/school"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const school_name = searchParams.get('school_name')

  try {
    //EDIT TO TAKE SCHOOL_NAME
    const { data, error } = await getSchool()
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
