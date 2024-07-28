
import { useSpaceContext } from "../helpers/Contexts"
import CategorizedGoals from "./CategorizedGoals"
import ImportantGoals from "./ImportantGoals"

const ListOfGoals = () => {
    const { shouldDisplayCategories } = useSpaceContext()

    return (
        <div> {/* TODO: this should be a scrollable area */}
            {shouldDisplayCategories
                ? <CategorizedGoals />
                : <ImportantGoals />
            }
        </div>
    )
}

export default ListOfGoals