"use client"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateSubject } from "@/lib/store"
import PageDir from "@components/pageDir"

export default function SchoolPage() {
  const dispatch = useDispatch()
  const school = useSelector((state) => {
    return state.course.school
  })

  const [subjectList, setSubjectList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getSubjects() {
      const res = await fetch("/api/subjects", {
        method: "GET",
      })
      const data = await res.json()
      setSubjectList(data)
      setLoading(false)
    }

    async function getSchool(school_name) {
      const res = await fetch(`/api/getSchool?school_name=${school_name}`, {
        method: "GET",
      })
      const data = await res.json()
      dispatch(updateSchool(data))
    }
    if (isLoading) {
      getSubjects().catch(console.error)
    }
    if(!school){

    }
  }, [school])

  function handleSubjectChange(val) {
    dispatch(updateSubject(val))
  }

  return (
    <div>
      <PageDir />

      {/* REMOVE THIS */}
      {school && school.name}

      <div className="w-full grid grid-cols-2">
        {subjectList.map((subject, index) => (
          <div className="w-full my-2" key={index}>
            <Link
              href={`/${subject.name}`}
              onClick={() => handleSubjectChange(subject)}
              className="border-b border-black text-xl"
            >
              {subject.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
