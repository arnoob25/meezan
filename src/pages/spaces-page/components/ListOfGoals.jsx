import { DndContext } from "@dnd-kit/core"
import { useSpaceContext } from "../helpers/Contexts"
import CategorizedGoalsView from "./CategorizedGoalsView"
import ImportantGoalsView from "./ImportantGoalsView"

const ListOfGoals = () => {
    const { shouldDisplayCategories } = useSpaceContext()

    return (
        <div className="flex flex-col gap-3 flex-1 overflow-x-hidden overflow-y-scroll"> {/* TODO: this should be a scrollable area */}
            <DndContext>
                {shouldDisplayCategories
                    ? <CategorizedGoalsView />
                    : <ImportantGoalsView />}
            </DndContext>
        </div>
    )
}

export default ListOfGoals