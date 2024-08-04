import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useGoalCollectionContext, useSpaceContext } from "../helpers/Contexts";
import GoalCard from "./GoalCard";
import GoalCreationModal from './GoalCreationModal';
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useDndMonitor } from "@dnd-kit/core";
import { useUpdateGoalStatusOrderMutation } from "../helpers/mutationFunctions";

const GoalCollectionCard = () => {
    const { currentSpace, isCategoryViewSelected } = useSpaceContext()
    const {
        goals,
        setGoals,
        goalPositions,
        setIsModalVisible,
        collectionCriteria,
    } = useGoalCollectionContext()

    const updateSortedGoalIds = useUpdateGoalStatusOrderMutation()

    useDndMonitor({
        onDragOver(event) {
            const { active, over } = event

            if (!over) return

            /* if (isCategoryViewSelected) {
                active.data.current.category.priority = over.data.current.category.priority
            } else { */
            active.data.current.category.status = over.data.current.category.status
            active.data.current.category.priority = over.data.current.category.priority

            if (active.data.current.goal.status === collectionCriteria.status) {
                setGoals(prevGoals => {
                    const activeIndex = prevGoals?.findIndex(g => g.id === active.id)
                    const overIndex = prevGoals?.findIndex(g => g.id === over.id)

                    return arrayMove(prevGoals, activeIndex, overIndex)
                })
            }

            if (over.data.current.category.status === collectionCriteria.status) {
                const isActiveGoalFromDifferentCategory = !goals.some(goal => goal.id === active.id)
                if (!isActiveGoalFromDifferentCategory) return

                setGoals(prevGoals => ([
                    ...prevGoals,
                    active.data.current.goal
                ]))
            }

            updateSortedGoalIds.mutate({
                space_id: currentSpace.id,
                field: collectionCriteria.fieldName,
                sorted_goal_ids: goalPositions
            })

        },
    })

    return (
        <div className="bg-light1 rounded-lg p-3 mx-3">
            <div className="flex justify-between items-end mb-2">
                <div className="title text-xs">{collectionCriteria.title}</div>

                <div
                    className="bg-light2 size-7 rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => setIsModalVisible(true)}
                >
                    <Icon icon="hugeicons:plus-sign" />
                </div>
            </div>

            <div className={`rounded-lg flex flex-col gap-3`}>
                <SortableContext items={goalPositions}>
                    {goals?.map(goal => <GoalCard key={goal.id} goal={goal} />)}
                </SortableContext>
            </div>

            <GoalCreationModal />
        </div>
    );
};

export default GoalCollectionCard;