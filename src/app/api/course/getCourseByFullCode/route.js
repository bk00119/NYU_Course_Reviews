import { getAPI } from "@/lib/api"
import { getCourseByFullCode } from "@/lib/db/course"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const full_code = searchParams.get("full_code")
  return await getAPI({ full_code }, getCourseByFullCode)
}
