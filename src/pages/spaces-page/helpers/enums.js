export const COLLECTION_METHODS = {
    status: 'status',
    priority: 'priority'
}

export const COLLECTION_CRITERIA = [
    { id: 1, criteria: 'in_progress', method: COLLECTION_METHODS.status, title: 'In Progress', color: 'red', fieldName: 'in_progress_sorted_goal_ids' },
    { id: 2, criteria: 'next', method: COLLECTION_METHODS.status, title: 'Next', color: 'yellow', fieldName: 'next_sorted_goal_ids' },
    { id: 3, criteria: 'important', method: COLLECTION_METHODS.priority, title: 'Important', color: 'purple' },
    { id: 4, criteria: 'delay', method: COLLECTION_METHODS.priority, title: 'Delay', color: 'green' },
    { id: 5, criteria: 'ignore', method: COLLECTION_METHODS.priority, title: 'Ignore', color: 'gray' },
]

export const DRAG_AND_DROP_COMPONENT_TYPES = {
    goalCard: 'goal',
    goalCategoryCard: 'category'
}