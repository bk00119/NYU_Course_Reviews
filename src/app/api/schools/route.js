import { getSchools } from "@/lib/db/school"

// export default async function handler(req, res){
//   if(req.method == 'GET'){
//     try {
//       const { schools, error } = await getSchools()
//       if (error) throw new Error(error)
//       return res.status(200).json({ schools })
//     } catch (error) {
//       return res.status(500).json({ error })
//     }
//   }

//   res.setHeader('Allow', [ 'GET' ])
//   res.status(425).end(`Method ${req.method} is not allowed`)
// }

export async function GET(req) {
  try {
    const { data, error } = await getSchools()
    if (error) throw new Error(error)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
