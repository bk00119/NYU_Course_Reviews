"use client"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateSchool } from "@/lib/store"
import PageDir from "@components/pageDir"
import Loading from "@components/loading"
import LoadArrayResult from "./components/loadArrayResult"

export default function Home() {
  const dispatch = useDispatch()
  const school = useSelector(({ courseDetails: { school } }) => {
    return school
  })

  const [schoolList, setSchoolList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getSchools() {
      const res = await fetch("/api/school/schools", {
        method: "GET",
      })
      const data = await res.json()
      setSchoolList(data)
      setLoading(false)
    }
    if (isLoading) {
      getSchools().catch(console.error)
    }
  }, [])

  function handleSchoolChange(val) {
    dispatch(updateSchool(val))
  }

  return (
    <div>
      <PageDir />
      <LoadArrayResult
        isLoading={isLoading}
        data={schoolList}
        message="No school"
      >
        <div className="w-full">
          {schoolList.map((school, index) => (
            <div className="w-full mb-4" key={index}>
              <Link
                href={`/${school.name}`}
                onClick={() => handleSchoolChange(school)}
                className="border-b border-black text-xl"
              >
                {school.name}
              </Link>
            </div>
          ))}
        </div>
      </LoadArrayResult>
    </div>
  )
}
