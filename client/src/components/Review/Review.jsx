import { useFetch } from "../../hooks/useFetch"

export const Review = ({ review }) => {
    const { description, reviewerId } = review;
    const [user, err] = useFetch({url: "/users/" + reviewerId})
    if (!user || !review) return null;
    return (<div className=" bg-zinc-700 rounded-md p-2 flex flex-col">
    <h4>{user.name}</h4>
    <p>{review.description}</p>
    </div>)
}