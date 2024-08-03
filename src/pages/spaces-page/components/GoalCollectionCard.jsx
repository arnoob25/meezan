import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useDroppable } from "@dnd-kit/core";
import { useGoalCollectionContext, useSpaceContext } from "../helpers/Contexts";
import GoalCard from "./GoalCard";
import GoalCreationModal from './GoalCreationModal';
import { SortableContext } from "@dnd-kit/sortable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const GoalCollectionCard = ({ id }) => {
    let filteredGoals = [];
    const { shouldDisplayCategories } = useSpaceContext();
    const { goals, setIsModalVisible, collectionCriteria: { title, priority, status }, } = useGoalCollectionContext()

    const { isOver, setNodeRef } = useDroppable({ id: id, data: { priority, status } })

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
                <Dialog>
                    <DialogTrigger>
                        <div
                            className="bg-light2 size-7 rounded-full flex justify-center items-center cursor-pointer"
                        >
                            <Icon icon="hugeicons:plus-sign" />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Create a New goal</DialogTitle>
                        <GoalCreationModal />
                    </DialogContent>
                </Dialog>
            </div>

            <div ref={setNodeRef} className={`rounded-lg border-2 flex flex-col gap-3 ${isOver ? 'border-black' : 'border-transparent'}`}>
                <SortableContext items={filteredGoals ? filteredGoals : []}>
                    {filteredGoals?.map(goal => <GoalCard key={goal.id} goal={goal} />)}
                </SortableContext>
            </div>

        </div>
    );
};

export default GoalCollectionCard;
