import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
import { DRAG_AND_DROP_COMPONENT_TYPES } from '../helpers/enums';
import { useGoalCollectionContext, useGoalListContext } from '../helpers/Contexts';


const GoalCard = ({ goal }) => {
    const { collectionCriteria: { method, criteria } } = useGoalCollectionContext()

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: goal.id,
        data: {
            type: DRAG_AND_DROP_COMPONENT_TYPES.goalCard,
            goal,
            category: { method, criteria }
        }
    });

    const style = { transform: CSS.Translate.toString(transform), transition }


    /* if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="bg-black opacity-10 h-12 rounded-sm"></div>
        )
    } */

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="bg-[#ffffff] text-sm text-left px-3 py-2 rounded-lg"
        >
            <div className="font-semibold">{goal.title}</div>
            <div className="text-sm">
                {goal.duration}
            </div>
            <div className="text-sm">{goal.period}</div>
        </div>
    );
};

export default GoalCard;