import { getAPI } from "@/lib/api"
import { getCourseSectionReviews } from "@/lib/db/course_section_review"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const course_section_id = searchParams.get("section_id")
  return await getAPI({ course_section_id }, getCourseSectionReviews)
}
