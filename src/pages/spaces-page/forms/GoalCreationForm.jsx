import { useForm } from 'react-hook-form';
import { AddGoalSchema } from '../helpers/FormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoalCollectionContext, useSpaceContext } from '../helpers/Contexts';
import { useCreateGoalMutation } from '../helpers/CreateGoalMutationFunction';

const GoalCreationForm = () => {
    const { currentSpaceId, selectedCategoryId, shouldDisplayCategories } = useSpaceContext()
    const { collectionCriteria: { priority, status }, setIsModalVisible } = useGoalCollectionContext()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(AddGoalSchema)
    });

    const createGoalMutation = useCreateGoalMutation();

    const onSubmit = (data) => {
        const goalData = {
            title: data.title,
            space_id: currentSpaceId,
            // category is null when creating goal from the 'Important Goals' - view
            category_id: shouldDisplayCategories ? selectedCategoryId : null,
            priority: (priority
                ? priority.trim()
                : shouldDisplayCategories ? 'delay' : 'important'),
            status: status ? status.trim() : 'next',
            duration: data.duration,
            approach: data.approach,
            time_window: data.timeWindow,
        };
        
        createGoalMutation.mutate(goalData, {
            onSuccess: () => {
                console.log('Goal created successfully');
                reset();
                setIsModalVisible(false);
            },
        });
    };

    return (
        <div className="w-full md:w-[25rem] bg-light1 p-5 rounded-lg flex flex-col gap-3 z-10">
            <h2>Create a New Goal</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Goal Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register("title")}
                        placeholder="Enter your goal title"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="approach">Approach</label>
                    <select {...register("approach")}>
                        <option value="">Select an approach</option>
                        <option value="asap">ASAP</option>
                        <option value="laid_back">Laid Back</option>
                    </select>
                    {errors.approach && <p>{errors.approach.message}</p>}
                </div>

                <div>
                    <label htmlFor="timeWindow">Time Window</label>
                    <select {...register("timeWindow")}>
                        <option value="">Time Window</option>
                        <option value="pre_fajr">Pre Fajr</option>
                        <option value="pre_duhr">Pre Duhr</option>
                        <option value="pre_asr">Pre Asr</option>
                        <option value="pre_maghrib">Pre Maghrib</option>
                        <option value="pre_isha">Pre Isha</option>
                        <option value="post_isha">Post Isha</option>
                    </select>
                    {errors.timeWindow && <p>{errors.timeWindow.message}</p>}
                </div>

                <div>
                    <label htmlFor="duration">Duration (in minutes)</label>
                    <input
                        type="number"
                        id="duration"
                        {...register("duration", { valueAsNumber: true })}
                        placeholder="Enter the duration in minutes"
                    />
                    {errors.duration && <p>{errors.duration.message}</p>}
                </div>

                <button type="submit" disabled={createGoalMutation.isLoading}>
                    {createGoalMutation.isLoading ? 'Creating...' : 'Create Goal'}
                </button>
            </form>
            {createGoalMutation.isError && (
                <p className="text-red-500">Error creating goal: {createGoalMutation.error.message}</p>
            )}
        </div>
    );
};

export default GoalCreationForm;