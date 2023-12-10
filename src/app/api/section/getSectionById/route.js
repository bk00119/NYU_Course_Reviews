import { getAPI } from "@/lib/api"
import { getSectionById } from "@/lib/db/course_section"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const section_id = searchParams.get("section_id")
  return await getAPI({ section_id }, getSectionById)
}
