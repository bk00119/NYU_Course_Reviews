import { getAPI } from "@/lib/api"
import { getSubjectCourses } from "@/lib/db/course"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const subject_id = searchParams.get('subject_id')
  return await getAPI({subject_id}, getSubjectCourses)
}