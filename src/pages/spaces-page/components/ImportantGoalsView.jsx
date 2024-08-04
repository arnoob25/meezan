import { useQuery } from "@tanstack/react-query"
import GoalCollectionCard from "./GoalCollectionCard"
import { getAllImportantGoalsWithinASpace } from "../helpers/queryFunctions"
import { GoalCollectionContextProvider, useSpaceContext } from "../helpers/Contexts"
import { LIST_OF_STATUS_TYPES } from "../helpers/enums"


const ImportantGoalsView = () => {
    const { currentSpace } = useSpaceContext()
    const currentSpaceId = currentSpace?.id

    const { data: goals } = useQuery({
        queryKey: ['goals', currentSpaceId],
        queryFn: () => getAllImportantGoalsWithinASpace(currentSpaceId),
        enabled: !!currentSpaceId
    })

    return (LIST_OF_STATUS_TYPES?.map(
        (statusType, index) => (
            <GoalCollectionContextProvider
                key={index}
                value={{ collectionCriteria: statusType, allGoals: goals || [] }}
            >
                <GoalCollectionCard />
            </GoalCollectionContextProvider>
        )
    ))
}
export default ImportantGoalsView