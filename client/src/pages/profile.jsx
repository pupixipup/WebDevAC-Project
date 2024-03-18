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
    parameters: {
      reviewerId: user?._id,
    },
    deps: user,
  })
  return (
    <div style={{ margin: "10px" }}>
      <h3>Name: {user?.name}</h3>
      <h4>Email: {user?.email}</h4>
      <div className="pb-3 overflow-x-auto flex gap-1">
        {Array.isArray(reviews) &&
          reviews.map((review) => <Review key={review._id} review={review} />)}
      </div>
    </div>
  )
}
