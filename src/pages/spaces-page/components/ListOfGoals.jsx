
import { useSpaceContext } from "../helpers/Contexts"
import CategorizedGoalsView from "./CategorizedGoalsView"
import ImportantGoalsView from "./ImportantGoalsView"

const ListOfGoals = () => {
    const { shouldDisplayCategories } = useSpaceContext()

    return (
        <div className="flex flex-col gap-3 flex-1 overflow-y-scroll"> {/* TODO: this should be a scrollable area */}
            {shouldDisplayCategories
                ? <CategorizedGoalsView />
                : <ImportantGoalsView />
            }
        </div>
    )
}

export default ListOfGoals