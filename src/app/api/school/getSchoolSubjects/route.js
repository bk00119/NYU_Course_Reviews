import { getSchoolSubjects } from "@/lib/db/subject";
import { getAPI } from "@/lib/api"

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const school_id = searchParams.get('school_id')

  return await getAPI({school_id}, getSchoolSubjects)
}