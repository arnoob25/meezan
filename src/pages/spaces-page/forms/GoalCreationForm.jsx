import { useForm } from 'react-hook-form';
import { CreateGoalSchema } from '../helpers/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoalCollectionContext, useSpaceContext } from '../helpers/Contexts';
import { useCreateGoalMutation } from '../helpers/mutationHooks';

const GoalCreationForm = () => {
    const { currentSpaceId, selectedCategoryId, isCategoryViewSelected } = useSpaceContext()
    const { collectionCriteria: { priority, status }, setIsModalVisible } = useGoalCollectionContext()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(CreateGoalSchema)
    });

    const createGoalMutation = useCreateGoalMutation();

    const onSubmit = (data) => {
        const newGoal = {
            title: data.title,
            space_id: currentSpaceId,
            // category is null when creating goal from the 'Important Goals' - view
            category_id: isCategoryViewSelected ? selectedCategoryId : null,
            priority: (priority
                ? priority.trim()
                : isCategoryViewSelected ? 'delay' : 'important'),
            status: status ? status.trim() : 'next',
            duration: data.duration,
            approach: data.approach,
            time_window: data.timeWindow,
        };
        
        createGoalMutation.mutate(newGoal, {
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
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {/* <label htmlFor="title">Goal Title</label> */}
                    <input
                        className="w-full bg-light2 px-4 py-2 rounded-lg"
                        type="text"
                        id="title"
                        {...register("title")}
                        placeholder="Enter your goal title"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>

                <div>
                    {/* <label htmlFor="duration">Duration (in minutes)</label> */}
                    <input
                        className="w-full bg-light2 px-4 py-2 rounded-lg"
                        type="number"
                        id="duration"
                        {...register("duration", { valueAsNumber: true })}
                        placeholder="Enter the duration in minutes"
                    />
                    {errors.duration && <p>{errors.duration.message}</p>}
                </div>

                <div>
                    {/* <label htmlFor="approach">Approach</label> */}
                    <select {...register("approach")} className="w-full bg-light2 px-3 py-2 rounded-lg cursor-pointer">
                        <option className="bg-light1 rounded-lg p-4" value="">Select an approach</option>
                        <option className="bg-light1 rounded-lg p-4" value="asap">ASAP</option>
                        <option className="bg-light1 rounded-lg p-4" value="laid_back">Laid Back</option>
                    </select>
                    {errors.approach && <p>{errors.approach.message}</p>}
                </div>

                <div>
                    {/* <label htmlFor="timeWindow">Time Window</label> */}
                    <select {...register("timeWindow")} className="w-full bg-light2 px-3 py-2 rounded-lg cursor-pointer">
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

                <button 
                    className="w-full bg-dark1 text-light1 font-semibold px-5 py-3 rounded-lg" 
                    type="submit" 
                    disabled={createGoalMutation.isLoading}
                    >
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