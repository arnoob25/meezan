import { supabase } from '../../../lib/QueryClient'
import { useMutation, useQueryClient } from '@tanstack/react-query';


export const useCreateGoalMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newGoal) => {
            const { data, error } = await supabase
                .from('goals')
                .insert([newGoal])
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

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory) => {
            const { data, error } = await supabase
                .from('categories')
                .insert([newCategory])
                .select();

            if (error) throw error;
            return data[0];
        },
        onSuccess: (newCategory) => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries(['categories']);
        },
        onError: (error) => {
            // TODO: show a toast notification
            console.error('Error creating category:', error);
        },
    });
};