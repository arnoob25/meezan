import { DndContext, DragOverlay } from "@dnd-kit/core"
import { GoalListContextProvider, useSpaceContext } from "../helpers/Contexts"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useState } from "react"
import { COLLECTION_CRITERIA, COLLECTION_METHODS, } from "../helpers/enums"
import GoalCollectionCard from "./GoalCollectionCard"


const ListOfGoals = () => {
    const { isCategoryViewSelected } = useSpaceContext()
    const [activeCardId, setActiveCardId] = useState(null)

    return (
        <div className="flex flex-col gap-3 flex-1 overflow-y-scroll"> {/* TODO: this should be a scrollable area */}
            <GoalListContextProvider>
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
            </GoalListContextProvider>
        </div>
    )

    function handleDragStart(event) {
        setActiveCardId(event.active.id)
    }
}

export default ListOfGoals


const ImportantGoalsView = () => {
    return COLLECTION_CRITERIA.sort((a, b) => a.id - b.id).map(criteria => {
        if (criteria.method !== COLLECTION_METHODS.status) return null

        return <GoalCollectionCard key={criteria.id} collectionCriteria={criteria} />
    })
}

const CategorizedGoalsView = () => {
    return COLLECTION_CRITERIA.sort((a, b) => a.id - b.id).map(criteria => {
        if (criteria.method !== COLLECTION_METHODS.priority) return null

        return <GoalCollectionCard key={criteria.id} collectionCriteria={criteria} />

    })
}