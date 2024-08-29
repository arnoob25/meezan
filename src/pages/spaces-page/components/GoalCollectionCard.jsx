import {
    useGoalListContext,
    useGoalCreationModalContext,
    useSpaceContext,
    GoalCollectionContextProvider
} from "../helpers/Contexts";
import GoalCard from "./GoalCard";
import GoalCreationModal from './GoalCreationModal';
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useDndMonitor } from "@dnd-kit/core";
import {
    useUpdateGoalCollectionCriteriaMutation,
    useUpdateGoalOrderMutation
} from "../helpers/mutationHooks";
import { useFilterGoals } from "../helpers/hooks";

const GoalCollectionCard = ({ collectionCriteria }) => {
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

            const activeGoal = active?.data?.current?.goal
            const overGoal = over?.data?.current?.goal
            const { method, criteria } = collectionCriteria ?? {}

            if (!method && !criteria && !activeGoal?.[method] && !overGoal?.[method]) return

            const isDraggedInSameCollection = activeGoal?.[method] === overGoal?.[method] && activeGoal?.[method] === criteria
            const isDraggedInDifferentCollection = activeGoal?.[method] !== overGoal?.[method] && overGoal?.[method] === criteria

            if (isDraggedInSameCollection) {
                setAllGoals(prevGoals => {

                    const activeIndex = prevGoals?.findIndex(g => g && g.id === active.id);
                    const overIndex = prevGoals?.findIndex(g => g && g.id === over.id);
                    return arrayMove(prevGoals, activeIndex, overIndex);
                });
                updateGoalOrder(active.id, over.id);
            }

            if (isDraggedInDifferentCollection) {
                const activeGoalWithUpdatedStatus = {
                    ...activeGoal,
                    [method]: collectionCriteria.criteria
                }

                setAllGoals(prevGoals => {
                    const newState = prevGoals.map(goal => {
                        if (goal.id === active.id) return activeGoalWithUpdatedStatus
                        return goal
                    })
                    return newState
                });

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
    });

    return (
        <div className="bg-light1 rounded-lg p-3 mx-3">
            <GoalCollectionContextProvider value={{ collectionCriteria }}>
                <div className="flex justify-between items-end mb-2">
                    <div className="title text-xs">{collectionCriteria?.title}</div>
                    <button onClick={() => setIsModalVisible(true)} className="bg-light2 size-7 rounded-flat flex justify-center items-center cursor-pointer">
                        x
                    </button>
                </div>

                <div className="rounded-lg flex flex-col gap-3">
                    <SortableContext items={sortedPositions}>
                        {goals?.map(goal => <GoalCard key={goal.id} goal={goal} />)}
                    </SortableContext>
                </div>

                <GoalCreationModal />
            </GoalCollectionContextProvider>
        </div>
    );
};

export default GoalCollectionCard;