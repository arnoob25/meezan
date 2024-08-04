export const COLLECTION_METHODS = {
    status: 'status',
    priority: 'priority'
}

export const LIST_OF_STATUS_TYPES = [
    { title: 'In Progress', status: 'in_progress', color: 'red', fieldName: 'in_progress_sorted_goal_ids' },
    { title: 'Next', status: 'next', color: 'yellow', fieldName: 'next_sorted_goal_ids' },
]

export const LIST_OF_PRIORITY_LEVELS = [
    { title: 'Important', priority: 'important', color: 'purple' },
    { title: 'Delay', priority: 'delay', color: 'green' },
    { title: 'Ignore', priority: 'ignore', color: 'gray' },
]

export const DRAG_AND_DROP_COMPONENT_TYPES = {
    goalCard: 'goal',
    goalCategoryCard: 'category'
}