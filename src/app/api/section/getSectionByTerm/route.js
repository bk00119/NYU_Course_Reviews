import { getAPI } from "@/lib/api"
import { getSectionByTerm } from "@/lib/db/course_section"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const course_id = searchParams.get("course_id")
  const semester = searchParams.get("semester")
  const year = searchParams.get("year")
  const section_code = searchParams.get("section_code")
  return await getAPI({ course_id, semester, year, section_code }, getSectionByTerm)
}
