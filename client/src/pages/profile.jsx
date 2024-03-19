import { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { Review } from "../components/Review/Review"

export const Profile = () => {
  const { username } = useParams()
  const [user] = useFetch({
    url: "/users/" + username,
  })

  const [reviews] = useFetch({
    url: `/reviews/`,
    parameters: user
      ? {
          reviewerId: user._id,
        }
      : null,
    deps: user,
  })
  return (
    <div className="flex flex-col items-center m-auto max-w-[1000px] mt-[100px] p-5">
      <h3>
        <span className="thin">Name: </span>
        {user?.name}
      </h3>
      <h4>Email: {user?.email}</h4>
      <h3 className="thin">Your Reviews</h3>
      <hr className="w-full" />
      <div className="pb-3 overflow-x-auto flex gap-1 mt-10">
        {Array.isArray(reviews) &&
          reviews.map((review) => <Review key={review._id} review={review} />)}
      </div>
    </div>
  )
}
