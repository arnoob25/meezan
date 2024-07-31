import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useGoalCollectionContext, useSpaceContext } from "../helpers/Contexts";
import GoalCard from "./GoalCard";
import GoalCreationModal from './GoalCreationModal';

const GoalCollectionCard = () => {
    const { shouldDisplayCategories } = useSpaceContext();
    const {
        goals,
        collectionCriteria: { title, priority, status },
        setIsModalVisible,
    } = useGoalCollectionContext()

    let filteredGoals = [];

    /* filter by criteria (status/ priority) */
    if (shouldDisplayCategories) {
        filteredGoals = goals?.filter(goal => goal.priority === priority);
    } else {
        filteredGoals = goals?.filter(goal => goal.status === status);
    }

    return (
        <div className="bg-light1 rounded-lg p-3 mx-3">
            <div className="flex justify-between items-end mb-2">
                <div className="title text-xs">{title}</div>

                <div
                    className="bg-light2 size-7 rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => setIsModalVisible(true)}
                >
                    <Icon icon="hugeicons:plus-sign"/>
                </div>
            </div>

            <div className="rounded-lg flex flex-col gap-3">
                {filteredGoals?.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>

            <GoalCreationModal />
        </div>
    );
};

export default GoalCollectionCard;
