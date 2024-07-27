import { useQuery } from "@tanstack/react-query"
import { getCurrentDayRituals } from "../spaces-page/helpers/QueryFunctions"

const TodayPage = () => {
    // TODO: determine day from date
    const day = 1
    const period = 'pre_duhr'

    const { data } = useQuery({
        queryKey: ['rituals', (day, period)],
        queryFn: () => getCurrentDayRituals(day, period)
    })

    return (
        <div>{data && data.length > 0
            ? <ul>
                {data.map(ritual => (
                    <li key={ritual.id}>{ritual.title}</li>
                ))}
            </ul>
            : <p>No rituals scheduled for today.</p>
        }</div>
    )
}
export default TodayPage