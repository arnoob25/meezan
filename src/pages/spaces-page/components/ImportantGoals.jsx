import { useQuery } from "@tanstack/react-query"
import GoalCollectionCard from "./GoalCollectionCard"
import { getAllImportantGoalsWithinASpace } from "../helpers/QueryFunctions"
import { GoalCollectionContextProvider, useSpaceContext } from "../helpers/Contexts"

const listOfStatusTypes = [
    { order: 1, title: 'In Progress', status: 'in_progress', color: 'red' },
    { order: 2, title: 'Next', status: 'next', color: 'yellow' },
]

const ImportantGoals = () => {
    const { currentSpaceId } = useSpaceContext()

    const { data: goals } = useQuery({
        queryKey: ['goals', currentSpaceId],
        queryFn: () => getAllImportantGoalsWithinASpace(currentSpaceId)
    })

    return (listOfStatusTypes.sort((a, b) => a.order - b.order)?.map(
        statusType => (
            <GoalCollectionContextProvider key={statusType.order} value={{ collectionCriteria: statusType, goals }}>
                <GoalCollectionCard />
            </GoalCollectionContextProvider>
        )
    ))
}
export default ImportantGoals