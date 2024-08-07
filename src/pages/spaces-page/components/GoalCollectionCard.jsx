import { Icon } from "@iconify-icon/react";
import { useGoalListContext, useGoalCreationModalContext, useSpaceContext, GoalCollectionContextProvider } from "../helpers/Contexts";
import GoalCard from "./GoalCard";
import GoalCreationModal from './GoalCreationModal';
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useDndMonitor } from "@dnd-kit/core";
import { useUpdateGoalStatusOrderMutation } from "../helpers/mutationHooks";
import { useFilterGoals } from "../helpers/hooks";

const GoalCollectionCard = ({ collectionCriteria }) => {
    const { goals, sortedPositions, updateGoalOrder } = useFilterGoals(collectionCriteria);

    const { currentSpace } = useSpaceContext();
    const { setAllGoals } = useGoalListContext();
    const { setIsModalVisible } = useGoalCreationModalContext();

    const updateSortedGoalIds = useUpdateGoalStatusOrderMutation();

    console.log(goals);

    useDndMonitor({
        onDragOver(event) {
            const { active, over } = event;
            const activeGoal = active?.data?.current?.goal
            const overGoal = over?.data?.current?.goal

            if (!over) return

            if (active?.data?.current?.goal?.status === collectionCriteria?.criteria) {
                setAllGoals(prevGoals => {
                    const activeIndex = prevGoals?.findIndex(g => g.id === active.id);
                    const overIndex = prevGoals?.findIndex(g => g.id === over.id);

                    return arrayMove(prevGoals, activeIndex, overIndex);
                });

                updateGoalOrder(active.id, over.id);
            }

            if (activeGoal?.status && overGoal?.status && collectionCriteria?.criteria &&
                activeGoal.status !== overGoal.status && overGoal.status === collectionCriteria.criteria) {

                const activeGoalWithUpdatedStatus = {
                    ...activeGoal,
                    status: collectionCriteria.criteria
                }

                setAllGoals(prevGoals => {
                    const newState = prevGoals.map(goal => {
                        if (goal.id === active.id) return activeGoalWithUpdatedStatus
                        return goal
                    })

                    console.log(prevGoals   , newState);



                    return newState
                });
            }

            updateSortedGoalIds.mutate({
                space_id: currentSpace?.id,
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
                    <div onClick={() => setIsModalVisible(true)} className="bg-light2 size-7 rounded-flat flex justify-center items-center cursor-pointer">
                        <Icon icon="hugeicons:plus-sign" />
                    </div>
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