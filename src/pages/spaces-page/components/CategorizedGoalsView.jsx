import { useQuery } from "@tanstack/react-query"
import { useSpaceContext } from "../helpers/Contexts"
import GoalCollectionCard from "./GoalCollectionCard"
import { getAllGoalsWithinACategory } from "../helpers/queryFunctions"
import { GoalCollectionContextProvider } from "../helpers/Contexts"
import { LIST_OF_PRIORITY_LEVELS } from "../helpers/enums"


const CategorizedGoalsView = () => {
    const { selectedCategoryId } = useSpaceContext()

    const { data: goals } = useQuery({
        queryKey: ['goals', selectedCategoryId],
        queryFn: () => getAllGoalsWithinACategory(selectedCategoryId)
    })

    return (LIST_OF_PRIORITY_LEVELS?.map(
        (priorityLevel, index) => (
            <GoalCollectionContextProvider
                key={index}
                value={{ collectionCriteria: priorityLevel, allGoals: goals || [] }}
            >
                <GoalCollectionCard />
            </GoalCollectionContextProvider>
        )
    ))
}
export default CategorizedGoalsView