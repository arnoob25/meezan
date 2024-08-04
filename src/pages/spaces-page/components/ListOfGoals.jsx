import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useSpaceContext } from "../helpers/Contexts"
import CategorizedGoalsView from "./CategorizedGoalsView"
import ImportantGoalsView from "./ImportantGoalsView"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useState } from "react"


const ListOfGoals = () => {
    const { isCategoryViewSelected } = useSpaceContext()
    const [activeCardId, setActiveCardId] = useState(null)

    return (
        <div className="flex flex-col gap-3 flex-1 overflow-y-scroll"> {/* TODO: this should be a scrollable area */}
            <DndContext modifiers={[
                restrictToVerticalAxis,
                restrictToWindowEdges,
            ]}
                onDragStart={handleDragStart}
            >
                {isCategoryViewSelected
                    ? <CategorizedGoalsView />
                    : <ImportantGoalsView />}

                {activeCardId
                    ? <DragOverlay>
                        <div>Dragging</div>
                    </DragOverlay>
                    : null}
            </DndContext>
        </div>
    )

    function handleDragStart(event) {
        setActiveCardId(event.active.id)
    }
}

export default ListOfGoals