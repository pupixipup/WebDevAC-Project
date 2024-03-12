import { useFetch } from "../../hooks/useFetch"

export const Review = ({ review }) => {
    const { score, description, createdAt, reviewerId } = review;
    const date = new Date(createdAt).toDateString()
    const [user, err] = useFetch({url: "/users/" + reviewerId})
    if (!user || !review) return null;
    return (<div className=" bg-zinc-700 rounded-md p-2 flex flex-col">
    <h4>{user.name}</h4>
    <p>{score}/5</p>
    <p>{description}</p>
    <span>{date}</span>
    </div>)
}