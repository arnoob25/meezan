import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "./QueryClient";

export const useCreateGoalMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (goalData) => {
            const { data, error } = await supabase
                .from('goal')
                .insert([goalData])
                .select();

            if (error) throw error;
            return data[0];
        },
        onSuccess: (newGoal) => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries(['goals']);
        },
        onError: (error) => {
            // TODO: show a toast notification
            console.error('Error creating goal:', error);
        },
    });
};