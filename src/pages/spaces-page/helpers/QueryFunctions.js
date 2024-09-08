import { supabase } from '../../../lib/QueryClient'


// TODO: get rituals that haven't been completed yet
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

export async function getSelectedSpace(space_id) {
    let { data: spaces, error } = await supabase
        .from('spaces')
        .select("*")
        .eq('id', space_id)

    if (error) {
        console.error("Error fetching spaces:", error);
        return [];
    }

    return spaces[0];
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

export async function getAllCategoriesForASpace(spaceId) {
    let { data: categories, error } = await supabase
        .from('categories')
        .select("*")
        .eq('space_id', spaceId)
        .order('title', { ascending: true });

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

    return categories;
}

export async function getAllGoalsWithinACategory(categoryId) {
    let { data: goals, error } = await supabase
        .from('goals')
        .select("*")
        .eq('category_id', categoryId)
        .neq('status', 'completed')

    if (error) {
        console.error("Error fetching goals:", error);
        return [];
    }

    return goals;
}

export async function getAllImportantGoalsWithinASpace(spaceId) {
    let { data: goals, error } = await supabase
        .from('goals')
        .select("*")
        .eq('space_id', spaceId)
        .eq('priority', 'important')
        .neq('status', 'completed')

    if (error) {
        console.error("Error fetching goals:", error);
        return [];
    }

    return goals;
}