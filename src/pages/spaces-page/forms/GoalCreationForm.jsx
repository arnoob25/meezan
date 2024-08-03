import { useForm } from 'react-hook-form';
import { CreateGoalSchema } from '../helpers/FormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoalCollectionContext, useSpaceContext } from '../helpers/Contexts';
import { useCreateGoalMutation } from '../helpers/MutationFunctions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const GoalCreationForm = () => {
    const { currentSpaceId, selectedCategoryId, shouldDisplayCategories } = useSpaceContext()
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
            category_id: shouldDisplayCategories ? selectedCategoryId : null,
            priority: (priority
                ? priority.trim()
                : shouldDisplayCategories ? 'delay' : 'important'),
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
        <div className="w-full flex flex-col gap-3">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
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
                    <input
                        className="w-full bg-light2 px-4 py-2 rounded-lg"
                        type="number"
                        id="duration"
                        {...register("duration", { valueAsNumber: true })}
                        placeholder="Enter the duration in minutes"
                    />
                    {errors.duration && <p>{errors.duration.message}</p>}
                </div>

                <Select {...register("approach")}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an approach" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ASAP">ASAP</SelectItem>
                        <SelectItem value="Laid Back">Laid Back</SelectItem>
                    </SelectContent>
                    {errors.approach && <p>{errors.approach.message}</p>}
                </Select>

                <Select {...register("timeWindow")}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Time Window" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Pre Fajr">Pre Fajr</SelectItem>
                        <SelectItem value="Pre Duhr">Pre Duhr</SelectItem>
                        <SelectItem value="Pre Asr">Pre Asr</SelectItem>
                        <SelectItem value="Pre Maghrib">Pre Maghrib</SelectItem>
                        <SelectItem value="Pre Isha">Pre Isha</SelectItem>
                        <SelectItem value="Post Isha">Post Isha</SelectItem>
                    </SelectContent>
                    {errors.timeWindow && <p>{errors.timeWindow.message}</p>}
                </Select>

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