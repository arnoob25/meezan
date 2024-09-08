export const COLLECTION_METHODS = {
    status: 'status',
    priority: 'priority'
}

export const COLLECTION_CRITERIA = [
    {
        id: 1,
        criteria: 'in_progress',
        method: COLLECTION_METHODS.status,
        title: 'In Progress',
        color: 'red',
        tableName: 'spaces',
        fieldName: 'in_progress_goal_ids'
    },
    {
        id: 2,
        criteria: 'next',
        method: COLLECTION_METHODS.status,
        title: 'Next',
        color: 'yellow',
        tableName: 'spaces',
        fieldName: 'next_goal_ids'
    },
    {
        id: 3,
        criteria: 'important',
        method: COLLECTION_METHODS.priority,
        title: 'Important',
        color: 'purple',
        tableName: 'categories',
        fieldName: 'important_goal_ids'
    },
    {
        id: 4,
        criteria: 'delay',
        method: COLLECTION_METHODS.priority,
        title: 'Delay',
        color: 'green',
        tableName: 'categories',
        fieldName: 'delay_goal_ids'
    },
    {
        id: 5,
        criteria: 'ignore',
        method: COLLECTION_METHODS.priority,
        title: 'Ignore',
        color: 'gray',
        tableName: 'categories',
        fieldName: 'ignore_goal_ids'
    },
]

export const DRAG_AND_DROP_COMPONENT_TYPES = {
    goalCard: 'goal',
    goalCategoryCard: 'category'
}