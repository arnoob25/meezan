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

    useDndMonitor({
        onDragOver(event) {
            const { active, over } = event;
            if (!over) return;

            if (active.data.current.goal.status === collectionCriteria.criteria) {
                setAllGoals(prevGoals => {
                    const activeIndex = prevGoals?.findIndex(g => g.id === active.id);
                    const overIndex = prevGoals?.findIndex(g => g.id === over.id);

                    return arrayMove(prevGoals, activeIndex, overIndex);
                });

                updateGoalOrder(active.id, over.id)
            }

            if (over.data.current.goal.status === collectionCriteria.criteria) {
                active.data.current.goal.status = over.data.current.goal.status;
                active.data.current.category.method = over.data.current.category.method;
                active.data.current.category.criteria = over.data.current.category.criteria;

                const activeGoalIndex = goals.findIndex(g => g.id === active.id)
                const activeGoal = goals[activeGoalIndex]
                activeGoal.status = collectionCriteria.criteria;

                const newState = goals.map(goal => {
                    if (goal.id === active.id) {
                        goal.status = collectionCriteria.criteria
                        return goal
                    }
                    return goal
                })
                console.log(newState);


                /* setAllGoals(prevGoals => ()) */
            }

            updateSortedGoalIds.mutate({
                space_id: currentSpace.id,
                field: collectionCriteria.fieldName,
                sorted_goal_ids: sortedPositions,
            });
        },
    });

    return (
        <div className="bg-light1 rounded-lg p-3 mx-3">
            <GoalCollectionContextProvider value={{ collectionCriteria }}>
                <div className="flex justify-between items-end mb-2">
                    <div className="title text-xs">{collectionCriteria.title}</div>
                    <div onClick={() => setIsModalVisible(true)} className="bg-light2 size-7 rounded-full flex justify-center items-center cursor-pointer">
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