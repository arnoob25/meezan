import GoalCard from "./GoalCard";

// TODO: replace with a proper query and filter by criteria
const goalList = [
    { id: 1, title: 'goal1', duration: 2, period: 'Pre Duhr' },
    { id: 2, title: 'goal2', duration: 4, period: 'Pre Asr' },
    { id: 3, title: 'goal3', duration: 1, period: 'Pre Maghrib' }
]

const GoalCollectionCard = ({ criteria }) => {
    return (
        <div className="bg-light1 rounded-lg p-3 mx-3">
            <div className="flex justify-between items-end mb-2">
                <div className="title text-xs">{criteria.title}</div>
                <div className="bg-light2 size-7 rounded-full flex justify-center items-center"
                // TODO: display new goal creation modal
                >
                    PIcon
                </div>
            </div>
            <div className="rounded-lg flex flex-col gap-3">
                {goalList.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>
        </div>
    );
};

export default GoalCollectionCard;