"use client"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateSubject } from "@/lib/store"
import PageDir from "@components/pageDir"
import LoadArrayResult from "@components/loadArrayResult"

export default function SchoolPage() {
  const dispatch = useDispatch()
  const school = useSelector(({ courseDetails: { school } }) => {
    return school
  })

  const [subjectList, setSubjectList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getSubjects() {
      const res = await fetch(
        `/api/school/getSchoolSubjects?school_id=${school._id}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      setSubjectList(data)
      setLoading(false)
    }

    if (isLoading && school) {
      getSubjects().catch(console.error)
    }
    if (!school) {
    }
  }, [school])

  function handleSubjectChange(val) {
    dispatch(updateSubject(val))
  }

  return (
    <div>
      <PageDir />
      <LoadArrayResult
        isLoading={isLoading}
        data={subjectList}
        message="No subject"
      >
        <div className="w-full grid grid-cols-2">
          {subjectList.map((subject, index) => (
            <div className="w-full my-2" key={index}>
              <Link
                href={`${school.name}/${subject.code}: ${subject.name}`}
                onClick={() => handleSubjectChange(subject)}
                className="border-b border-black text-xl"
              >
                {subject.name}
              </Link>
            </div>
          ))}
        </div>
      </LoadArrayResult>
    </div>
  )
}
