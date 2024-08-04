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

export const useUpdateGoalStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }) => {
            const { data, error } = await supabase
                .from('goals')
                .update({ status: status })
                .eq('id', id)
                .select()


            if (error) throw error;
            return data[0];
        },
        onSuccess: (newGoal) => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries(['goals']);
        },
        onError: (error) => {
            // TODO: show a toast notification
            console.error('Error updating goal:', error);
        },
    });
};

export const useUpdateGoalPriorityMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, priority }) => {
            const { data, error } = await supabase
                .from('goals')
                .update({ priority: priority })
                .eq('id', id)
                .select()


            if (error) throw error;
            return data[0];
        },
        onSuccess: (newGoal) => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries(['goals']);
        },
        onError: (error) => {
            // TODO: show a toast notification
            console.error('Error updating goal:', error);
        },
    });
};

const debouncedUpdate = _.debounce(
    async ({ space_id, field, sorted_goal_ids }) => {
        const { data, error } = await supabase
            .from('spaces')
            .update({ [field]: [...sorted_goal_ids] })
            .eq('id', space_id)
            .select();

        if (error) throw error;

        return data[0];
    },
    1000
);

export const useUpdateGoalStatusOrderMutation = () => {
    const queryClient = useQueryClient();

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