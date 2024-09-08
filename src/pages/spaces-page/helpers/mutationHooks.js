import _ from 'lodash';
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

export const useUpdateGoalCollectionCriteriaMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, method, criteria }) => {
            const { data, error } = await supabase
                .from('goals')
                .update({ [method]: criteria })
                .eq('id', id)
                .select()

            if (error) throw error;
            return data[0];
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries(['goals']);
        },
        onError: (error) => {
            // TODO: show a toast notification
            console.error('Error updating goal:', error);
        },
    });
};

// updates the order of goals in different collections (status/ priority) of a space or category
export const useUpdateGoalOrderMutation = () => {   
    const queryClient = useQueryClient();

    const debouncedUpdate = _.debounce(
        async ({ item_id, table, field, sorted_goal_ids }) => {

            const { data, error } = await supabase
                .from(table)
                .update({ [field]: [...sorted_goal_ids] })
                .eq('id', item_id)
                .select();

            if (error) throw error;
            return data[0];
        },
        1000
    );

    return useMutation({
        mutationFn: async (args) => debouncedUpdate(args),

        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries(['spaces']);
        },
        onError: (error) => {
            // TODO: show a toast notification
            console.error('Error updating goal:', error);
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