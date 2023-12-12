"use client"
import { useState } from "react"
import RatingBlock from "./ratingBlock"

export default function Rating({
  rating,
  setRating,
  options,
  reverse = false,
}) {
  const RED = "bg-red-600"
  const ORANGE = "bg-orange-500"
  const YELLOW = "bg-yellow-400"
  const LIGHT_GREEN = "bg-lime-400"
  const GREEN = "bg-green-600"

  // const [rating, setRating] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <div className="flex ml-4">
      <p className="text-sm mt-2 hidden md:block">1 - {options[0]}</p>
      <div className="flex flex-col items-center mx-2">
        <div
          className="flex h-9 items-center mb-1"
          onMouseLeave={() => setHovered(null)}
        >
          {/* LEFT */}
          <RatingBlock
            val={1}
            rating={rating}
            setRating={setRating}
            hovered={hovered}
            setHovered={setHovered}
            color={reverse ? GREEN : RED}
            left_rounded={true}
            right_rounded={false}
            width="w-10"
          />

          {/* MIDDLE */}
          <RatingBlock
            val={2}
            rating={rating}
            setRating={setRating}
            hovered={hovered}
            setHovered={setHovered}
            color={reverse ? LIGHT_GREEN : ORANGE}
            left_rounded={false}
            right_rounded={false}
            width="w-10"
          />
          <RatingBlock
            val={3}
            rating={rating}
            setRating={setRating}
            hovered={hovered}
            setHovered={setHovered}
            color={YELLOW}
            left_rounded={false}
            right_rounded={false}
            width="w-10"
          />
          <RatingBlock
            val={4}
            rating={rating}
            setRating={setRating}
            hovered={hovered}
            setHovered={setHovered}
            color={reverse ? ORANGE : LIGHT_GREEN}
            left_rounded={false}
            right_rounded={false}
            width="w-10"
          />
          {/* RIGHT */}
          <RatingBlock
            val={5}
            rating={rating}
            setRating={setRating}
            hovered={hovered}
            setHovered={setHovered}
            color={reverse ? RED : GREEN}
            left_rounded={false}
            right_rounded={true}
            width="w-10"
          />
        </div>
        {/* RATING STATUS */}
        {rating || hovered ? (
          <p>
            {hovered
              ? `${hovered} - ${options[hovered - 1]}`
              : `${rating} - ${options[rating - 1]}`}
          </p>
        ) : (
          <p>Please rate</p>
        )}
      </div>
      <p className="ml-2 text-sm mt-2 hidden md:block">5 - {options[4]}</p>
    </div>
  )
}
