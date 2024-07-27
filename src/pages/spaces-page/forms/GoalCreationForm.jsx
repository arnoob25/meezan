import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddGoalSchema } from '../../helpers/FormSchemas';

const GoalCreationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(AddGoalSchema)
    });

    /*  const { mutate } = useMutation({
         mutationFn: 
     }) */

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
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

                <button type="submit">Create Goal</button>
            </form>
        </div>
    );
};

export default GoalCreationForm;