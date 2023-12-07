import { getAPI } from "@/lib/api"
import { getSubjects } from "@/lib/db/subject"

export async function GET(req) {
  return await getAPI(null, getSubjects)
}
