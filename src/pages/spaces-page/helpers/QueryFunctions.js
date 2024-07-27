import { supabase } from "./QueryClient";

export async function getCurrentDayRituals(day, period) {
    let { data: rituals, error } = await supabase
        .from('rituals')
        .select("*")
        .contains('scheduled_days', [day])
        .eq('time_window', period)

    if (error) {
        console.error("Error fetching rituals:", error);
        return [];
    }

    return rituals;
}

export async function getAllSpaces() {
    let { data: spaces, error } = await supabase
        .from('space')
        .select('*')
    if (error) {
        console.log('Error fetching spaces:', error);
        return []
    }
    return spaces
}

export async function getGoalsWithinASpace(spaceId) {
    let { data: goals, error } = await supabase
        .from('goal')
        .select("*")
        .eq('space_id', [spaceId])

    if (error) {
        console.error("Error fetching goals:", error);
        return [];
    }

    return goals;
}