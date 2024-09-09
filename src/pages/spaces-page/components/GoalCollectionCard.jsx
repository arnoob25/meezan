import {
    useGoalCreationModalContext,
    useSpaceContext,
    GoalCollectionContextProvider
} from "../helpers/Contexts";
import GoalCard from "./GoalCard";
import GoalCreationModal from './GoalCreationModal';
import { SortableContext } from "@dnd-kit/sortable";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
    useUpdateGoalCollectionCriteriaMutation,
    useUpdateGoalOrderMutation
} from "../helpers/mutationHooks";
import { useHandleGoalOrderAndCollectionChange } from "../helpers/hooks";

/* TODO: reproducing the bug: have a collection with several goals. Drag the last goal over the goal sitting above it
do it again. Now, tap the first goal, and you should see that the last two goals change positions.Drag */

/* TODO: bug - sometimes when I drag a goal around the edge of the Container, it just vanishes. 
most probably the array and the criteria aren't being updated together, and/ or aren't re rendering
*/

/* TODO: sometimes when I drop a goal, and everything's fine, but I only see the update after I refresh...
most probably, it can be fixed by converting the goalPositionsRef into a state so that it triggers a re render, when its changed 
but we might suffer in terms of performance */

// TODO: the function that handles the mismatch between filtered goals, and ordered goal id array is malfunctioning

const GoalCollectionCard = ({ collectionCriteria }) => {
    const { method, criteria } = collectionCriteria ?? {}
    const { isCategoryViewSelected, currentSpace, selectedCategoryId } = useSpaceContext();

    const {
        goals,
        sortedGoalPositions,
        updateGoalOrderArray,
        updateGoalCollectionCriteria
    } = useHandleGoalOrderAndCollectionChange(collectionCriteria)
    const updateCollectionCriteria = useUpdateGoalCollectionCriteriaMutation()
    const updateSortedGoalIds = useUpdateGoalOrderMutation();

    function updateGoalPositionsInDb() {
        updateSortedGoalIds.mutate({
            item_id: isCategoryViewSelected ? selectedCategoryId : currentSpace?.id,
            table: collectionCriteria?.tableName,
            field: collectionCriteria?.fieldName,
            sorted_goal_ids: sortedGoalPositions,
        });
    }

    useDndMonitor({
        onDragOver(event) {
            const { active, over } = event
            const {
                shouldIgnore,
                isDraggedInSameCollection,
                isDraggedInDifferentCollection
            } = shouldIgnoreDragEvent(event, collectionCriteria)

            if (shouldIgnore) return

            if (isDraggedInSameCollection) {
                updateGoalOrderArray(active.id, over.id)
                updateGoalPositionsInDb()
            }

            if (isDraggedInDifferentCollection) {
                updateGoalCollectionCriteria(active.data?.current?.goal, method)
                updateCollectionCriteria.mutate({ id: event.active.id, method, criteria })
                updateGoalPositionsInDb()
            }
        },
    });

    const { setNodeRef } = useDroppable({
        id: collectionCriteria.id,
        data: { collection: collectionCriteria }
    })

    const { setIsModalVisible } = useGoalCreationModalContext();

    return (
        <div ref={setNodeRef} className="bg-light1 rounded-lg p-3 mx-3">
            <GoalCollectionContextProvider value={{ collectionCriteria }}>
                <div className="flex justify-between items-end mb-2">
                    <div className="title text-xs">{collectionCriteria?.title}</div>
                    <button onClick={() => setIsModalVisible(true)} className="bg-light2 size-7 rounded-flat flex justify-center items-center cursor-pointer">
                        x
                    </button>
                </div>

                <div className="rounded-lg flex flex-col gap-3">
                    <SortableContext items={sortedGoalPositions}>
                        {goals?.map(goal => <GoalCard key={goal.id} goal={goal} />)}
                    </SortableContext>
                </div>

                <GoalCreationModal />
            </GoalCollectionContextProvider>
        </div>
    );
};

function shouldIgnoreDragEvent({ active, over } = {}, { method, criteria } = {}) {
    let shouldIgnore = false
    const activeGoal = active?.data?.current?.goal
    const overGoal = over?.data?.current?.goal
    const droppedOverGoal = !activeGoal?.[method] && !overGoal?.[method]
    const overCollection = over?.data?.current?.collection

    if (!active || !over) {
        if (!method && !criteria && droppedOverGoal) shouldIgnore = true
    }

    const isDraggedInSameCollection = activeGoal?.[method] === overGoal?.[method]
        && activeGoal?.[method] === criteria

    const isDraggedInDifferentCollection = activeGoal?.[method] !== overCollection?.criteria
        && overCollection?.criteria === criteria

    return {
        shouldIgnore,
        isDraggedInSameCollection,
        isDraggedInDifferentCollection
    }
}

export default GoalCollectionCard;