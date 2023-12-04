"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export default function PageDir() {
  // change to using reducer
  const params = useParams()
  const school = params.school
  const subject = params.subject
  return (
    <div className="text-2xl font-bold mb-4">
      <Link href="/" className="border-b-2 border-black">
        Schools
      </Link>
      {school && (
        <>
          {" / "}
          <Link href={`/${school}`} className="border-b-2 border-black">{decodeURIComponent(school)}</Link>
        </>
      )}
      {subject && (
        <>
          {" / "}
          <Link href={`/${school}/${subject}`} className="border-b-2 border-black">{decodeURIComponent(subject)}</Link>
        </>
      )}
    </div>
  )
}
