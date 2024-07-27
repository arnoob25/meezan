import { z } from "zod";

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

export const AddGoalSchema = z.object({
    title: z.string().optional(),
    approach: schedulingMethods.optional(),
    timeWindow: timeWindows.optional(),
    duration: z.number().optional(),
})