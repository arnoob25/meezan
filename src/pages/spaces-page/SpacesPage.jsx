import { useQuery } from "@tanstack/react-query"
import { getAllSpaces, getGoalsWithinASpace } from "./helpers/QueryFunctions"

const SpacesPage = () => {
    const space = 1

    const { data: goals } = useQuery({
        queryKey: ['goals', space],
        queryFn: () => getGoalsWithinASpace(space)
    })

    const { data: spaces } = useQuery({
        queryKey: ['spaces'],
        queryFn: () => getAllSpaces()
    })

    return (<>
        <div>{goals && goals.length > 0
            ? <ul>
                {goals.map(goal => (
                    <li key={goal.id}>{goal.title}</li>
                ))}
            </ul>
            : <p>{`No goals in the space.`}</p>
        }</div>

        <div>{spaces && spaces.length > 0
            ? <ul>
                {spaces.map(space => (
                    <li key={space.id}>{space.title}</li>
                ))}
            </ul>
            : <p>{`No spaces in the space.`}</p>
        }</div>
    </>)
}
export default SpacesPage