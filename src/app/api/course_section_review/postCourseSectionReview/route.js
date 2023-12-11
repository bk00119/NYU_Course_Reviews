import { postAPI } from "@/lib/api"
import { postCourseSectionReview } from "@/lib/db/reviews"

export async function POST(req) {
  const reqData = await req.json()
  return await postAPI(reqData, postCourseSectionReview)
}
