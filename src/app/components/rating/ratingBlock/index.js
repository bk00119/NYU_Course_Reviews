"use client"

import { useEffect, useState } from "react"
export default function RatingBlock({
  color,
  left_rounded,
  right_rounded,
  width,
  val,
  rating,
  setRating,
  hovered,
  setHovered,
}) {
  const grayColor = "bg-gray-200"
  const [ratingColor, setRatingColor] = useState(grayColor)
  const [hoveredColor, setHoveredColor] = useState(grayColor)
  useEffect(() => {
    if (rating) {
      if (rating >= val) {
        setRatingColor(color)
      } else {
        setRatingColor(grayColor)
      }
    }

    if (hovered >= val) {
      setHoveredColor(color)
    } else {
      setHoveredColor(grayColor)
    }
  }, [rating, hovered])

  function handleClick() {
    if (rating == val) {
      setRating(null)
    } else {
      setRating(val)
    }
  }

  function hanldeMouseEnter() {
    // if(rating && rating != val){
    //   setRating(null)
    // }
    setHovered(val)
  }

  return (
    <div
      className={`
        ml-1 
        h-full 
        cursor-pointer
        ${width}  
        ${rating ? ratingColor : hoveredColor}
        ${left_rounded && "rounded-l-full"} 
        ${right_rounded && "rounded-r-full"}`}
      onMouseEnter={hanldeMouseEnter}
      onClick={handleClick}
    />
  )
}
