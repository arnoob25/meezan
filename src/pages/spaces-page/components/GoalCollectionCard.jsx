import {
    useGoalListContext,
    useGoalCreationModalContext,
    useSpaceContext,
    GoalCollectionContextProvider
} from "../helpers/Contexts";
import GoalCard from "./GoalCard";
import GoalCreationModal from './GoalCreationModal';
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
    useUpdateGoalCollectionCriteriaMutation,
    useUpdateGoalOrderMutation
} from "../helpers/mutationHooks";
import { useFilterGoals } from "../helpers/hooks";

const GoalCollectionCard = ({ collectionCriteria }) => {
    const { setNodeRef } = useDroppable({
        id: collectionCriteria.id,
        data: { collection: collectionCriteria }
    })

    const {
        goals,
        sortedPositions,
        addNewGoal,
        updateGoalOrder
    } = useFilterGoals(collectionCriteria);

    const { isCategoryViewSelected, currentSpace, selectedCategoryId } = useSpaceContext();
    const { setAllGoals } = useGoalListContext();
    const { setIsModalVisible } = useGoalCreationModalContext();

    const updateCollectionCriteria = useUpdateGoalCollectionCriteriaMutation()
    const updateSortedGoalIds = useUpdateGoalOrderMutation();

    useDndMonitor({
        onDragOver(event) {
            const { active, over } = event;
            if (!active || !over) return

            const activeGoal = active.data?.current?.goal
            const overGoal = over.data?.current?.goal
            const { method, criteria } = collectionCriteria ?? {}

            const droppedOverGoal = !activeGoal?.[method] && !overGoal?.[method]

            if (!method && !criteria && droppedOverGoal) return

            const isDraggedInSameCollection = activeGoal?.[method] === overGoal?.[method] && activeGoal?.[method] === criteria
            const overCollection = over.data?.current?.collection

            const isDraggedInDifferentCollection = activeGoal?.[method] !== overCollection?.criteria && overCollection?.criteria === criteria

            if (isDraggedInSameCollection) {
                setAllGoals(allGoals => { // allGoals refer to goals being displayed in the current view in the space
                    const activeIndex = allGoals?.findIndex(g => g && g.id === active.id);
                    const overIndex = allGoals?.findIndex(g => g && g.id === over.id);
                    return arrayMove(allGoals, activeIndex, overIndex);
                });

                updateGoalOrder(active.id, over.id);
            }

            if (isDraggedInDifferentCollection) {
                console.log(over);
                const activeGoalWithUpdatedStatus = {
                    ...activeGoal,
                    [method]: collectionCriteria.criteria
                }

                setAllGoals(allGoals => ( // allGoals refer to goals being displayed in the current view in the space
                    allGoals.map(goal => {
                        if (goal.id === active.id) return activeGoalWithUpdatedStatus
                        return goal
                    })
                ));

                addNewGoal(active.id)

                updateCollectionCriteria.mutate({ id: active.id, method, criteria })
            }

            updateSortedGoalIds.mutate({
                item_id: isCategoryViewSelected ? selectedCategoryId : currentSpace?.id,
                table: collectionCriteria?.tableName,
                field: collectionCriteria?.fieldName,
                sorted_goal_ids: sortedPositions,
            });
        },
        onDragEnd(event) {

        }
    });

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
                    <SortableContext items={sortedPositions}>
                        {console.log(goals)}
                        {goals?.map(goal => <GoalCard key={goal.id} goal={goal} />)}
                    </SortableContext>
                </div>

                <GoalCreationModal />
            </GoalCollectionContextProvider>
        </div>
    );
};

export default GoalCollectionCard;