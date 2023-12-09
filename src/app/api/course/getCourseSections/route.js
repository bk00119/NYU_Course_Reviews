import { getAPI } from "@/lib/api"
import { getCourseSections } from "@/lib/db/course_section"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const course_id = searchParams.get('course_id')
  return await getAPI({course_id}, getCourseSections)
}