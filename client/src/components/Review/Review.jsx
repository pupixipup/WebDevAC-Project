import { useFetch } from "../../hooks/useFetch"

export const Review = ({ review }) => {
    const { description, reviewerId } = review;
    const [user, err] = useFetch({url: "/users/" + reviewerId})
    if (!user || !review) return null;
    return (<div>
    <div>{user.name}</div>
    <div>{review.description}</div>
    </div>)
}