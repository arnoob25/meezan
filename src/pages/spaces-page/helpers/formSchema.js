import { z } from "zod";

// goal creation
const timeWindows = z.enum([
    'pre_fajr',
    'pre_duhr',
    'pre_asr',
    'pre_maghrib',
    'pre_isha',
    'post_isha'
])

const schedulingMethods = z.enum([
    'asap',
    'laid_back'
])

// TODO: review the schema and update the submission handler
export const GoalCreationSchema = z.object({
    title: z.string().optional(),
    approach: schedulingMethods.optional(),
    timeWindow: timeWindows.optional(),
    duration: z.number().optional(),
})

// category creation

// TODO: review the schema and update the submission handler
export const CategoryCreationSchema = z.object({
    title: z.string().optional(),
})