import GoalCollectionCard from "./GoalCollectionCard"

const listOfStatusTypes = [
    { order: 1, title: 'In Progress', color: 'red' },
    { order: 2, title: 'Next', color: 'yellow' },
]

const listOfPriorityLevels = [
    { order: 1, title: 'Important', color: 'purple' },
    { order: 2, title: 'Delay', color: 'green' },
    { order: 3, title: 'Ignore', color: 'gray' },
]

const ListOfGoals = ({ shouldOrganizeByStatus }) => {
    if (shouldOrganizeByStatus) {
        return (listOfStatusTypes.sort((a, b) => a.order - b.color).map(
            statusType => <GoalCollectionCard key={statusType.order} criteria={statusType} />
        ))
    }

    else {
        return (listOfPriorityLevels.sort((a, b) => a.order - b.color).map(
            priorityType => <GoalCollectionCard key={priorityType.order} criteria={priorityType} />
        ))
    }
}
export default ListOfGoals