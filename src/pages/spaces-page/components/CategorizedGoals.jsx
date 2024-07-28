import { useQuery } from "@tanstack/react-query"
import { useSpaceContext } from "../helpers/Contexts"
import GoalCollectionCard from "./GoalCollectionCard"
import { getAllGoalsWithinACategory } from "../helpers/QueryFunctions"
import { GoalCollectionContextProvider } from "../helpers/Contexts"

const listOfPriorityLevels = [
    { order: 1, title: 'Important', priority: 'important', color: 'purple' },
    { order: 2, title: 'Delay', priority: 'delay', color: 'green' },
    { order: 3, title: 'Ignore', priority: 'ignore', color: 'gray' },
]

const CategorizedGoals = () => {
    const { selectedCategoryId } = useSpaceContext()

    const { data: goals } = useQuery({
        queryKey: ['goals', selectedCategoryId],
        queryFn: () => getAllGoalsWithinACategory(selectedCategoryId)
    })

    return (listOfPriorityLevels.sort((a, b) => a.order - b.order)?.map(
        priorityLevel => (
            <GoalCollectionContextProvider key={priorityLevel.order} value={{ collectionCriteria: priorityLevel, goals }}>
                <GoalCollectionCard />
            </GoalCollectionContextProvider>
        )
    ))
}
export default CategorizedGoals