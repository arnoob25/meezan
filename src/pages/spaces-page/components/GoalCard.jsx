import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { useUpdateGoalPriorityMutation, useUpdateGoalStatusMutation } from "../helpers/MutationFunctions";
import { useSpaceContext } from "../helpers/Contexts";
import { useSortable } from "@dnd-kit/sortable";


const GoalCard = ({ goal }) => {
    const { shouldDisplayCategories } = useSpaceContext()
    const updateGoalStatusMutation = useUpdateGoalStatusMutation()
    const updateGoalPriorityMutation = useUpdateGoalPriorityMutation()

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `goal.${goal.id}`,
    });

    /* const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: `goal.${goal.id}`, }); */

    useDndMonitor({
        onDragEnd(event) {
            if (event.active.id === `goal.${goal.id}`) {
                if (shouldDisplayCategories) {
                    const priority = event.over.data.current.priority
                    updateGoalPriorityMutation.mutate({ id: goal.id, priority })
                } else {
                    const status = event.over.data.current.status
                    updateGoalStatusMutation.mutate({ id: goal.id, status })
                }
            }
        }
    })

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Translate.toString(transform)/* , transition  */}}
            {...listeners}
            {...attributes}
            className="goal bg-light2 text-sm text-left px-3 py-2 rounded-lg"
        >
            <div className="goal-name font-semibold">{goal.title}</div>
            <div className="goal-duration text-sm">
                {goal.duration}
            </div>
            <div className="goal-time text-sm">{goal.period}</div>
        </div>
    );
};

export default GoalCard;