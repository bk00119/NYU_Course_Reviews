import { getAPI } from "@/lib/api"
import { getSchools } from "@/lib/db/school"

export async function GET(req) {
  return await getAPI(null, getSchools)
}
