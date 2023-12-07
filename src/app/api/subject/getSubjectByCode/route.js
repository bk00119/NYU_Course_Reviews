import { getAPI } from "@/lib/api";
import { getSubjectByCode } from "@/lib/db/subject";

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const subject_code = searchParams.get('subject_code')
  return await getAPI({subject_code}, getSubjectByCode)
}