import { getSchool } from "@/lib/db/school"
import { getAPI } from "@/lib/api"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const school_name = searchParams.get("school_name")

  return await getAPI({ school_name }, getSchool)
}
