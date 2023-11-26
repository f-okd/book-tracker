import { useUpdateUser } from '../auth/hooks/useUpdateUser';
import { FieldValues, useForm } from 'react-hook-form';

const UpdatePasswordForm = () => {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;
  const { updateUser, isUpdatingUser } = useUpdateUser();

  const onSubmit = ({ password }: FieldValues) => {
    updateUser({ password }, { onSuccess: () => reset() });
  };

  return (
    <form
      className="bg-secondary shadow-md rounded px-8 py-3 my-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6">
        <label
          className={`block sm:text-xl md:text-2xl font-semibold mb-2 ${
            errors?.confirmPassword?.message
              ? 'text-errorColour'
              : 'text-ternary'
          }`}
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          {...register('password', {
            required: 'password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
      </div>
      <div className="mb-6">
        <label
          className={`block sm:text-xl md:text-2xl font-semibold mb-2 ${
            errors?.confirmPassword?.message
              ? 'text-errorColour'
              : 'text-ternary'
          }`}
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="******************"
          {...register('confirmPassword', {
            required: 'Please confirm password',
            validate: (value) =>
              value === getValues().password || 'Passwords do not match',
          })}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-ternary hover:bg-blue-700 text-primary font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isUpdatingUser}
        >
          Update password
        </button>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
