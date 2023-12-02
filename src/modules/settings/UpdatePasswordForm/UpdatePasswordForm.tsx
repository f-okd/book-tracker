import { useUpdateUser } from '../../auth/hooks/useUpdateUser';
import { FieldValues, useForm } from 'react-hook-form';

const UpdatePasswordForm = () => {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;
  const { updateUser, isUpdatingUser } = useUpdateUser();

  const onSubmit = ({ password }: FieldValues) => {
    updateUser({ password }, { onSuccess: () => reset() });
  };

  return (
    <>
      <form
        className="my-3 rounded bg-secondary px-8 py-3 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <label
            className={`mb-2 block font-semibold sm:text-xl md:text-2xl ${
              errors?.confirmPassword?.message
                ? 'text-errorColour'
                : 'text-ternary'
            }`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
            data-testid="passwordInput"
            id="password"
            type="password"
            placeholder="******************"
            {...register('password', {
              required: 'password is required',
              minLength: {
                value: 16,
                message: 'Password must be at least 16 characters long',
              },
            })}
          />
        </div>
        <div className="mb-6">
          <label
            className={`mb-2 block font-semibold sm:text-xl md:text-2xl ${
              errors?.confirmPassword?.message
                ? 'text-errorColour'
                : 'text-ternary'
            }`}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
            data-testid="confirmPasswordInput"
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
            data-testid="updatePasswordButton"
            className="hover:bg-blue-700 focus:shadow-outline rounded bg-ternary px-4 py-2 font-semibold text-primary focus:outline-none"
            type="submit"
            disabled={isUpdatingUser}
          >
            Update password
          </button>
        </div>
      </form>
      {errors.password && (
        <p className="text-errorColour" data-testid="passwordErrorMessage">
          * {errors.password?.message?.toString()}
        </p>
      )}
      {errors.confirmPassword && (
        <p
          className="text-errorColour"
          data-testid="confirmPasswordErrorMessage"
        >
          * {errors.confirmPassword?.message?.toString()}
        </p>
      )}
    </>
  );
};

export default UpdatePasswordForm;
