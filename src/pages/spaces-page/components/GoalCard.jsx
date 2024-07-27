
const GoalCard = ({ goal }) => {
    console.log(goal);
    return (
        <button className="task bg-light2 text-sm text-left px-3 py-2 rounded-lg">
            <div className="goal-name font-semibold">{goal.title}</div>
            <div className="goal-duration text-sm">
                {goal.duration}
            </div>
            <div className="goal-time text-sm">{goal.period}</div>
        </button>
    );
};

export default GoalCard;