import { Link } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useSignUp } from '../../hooks/useSignUp';

const SignUp = () => {
  const { signUp, isSigningUp } = useSignUp();

  // use react hook form library
  // The register method helps you register an input field into React Hook Form so that it is available for the validation, and its value can be tracked for changes.
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  // Note: if there are any errors, this function won't even be reached
  const onSubmit = ({ username, email, password }: FieldValues) => {
    signUp(
      { username, email, password },
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary">
      <p className="pb-4 text-3xl font-bold">Sign Up</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 rounded bg-secondary px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label
            className={`mb-2 block font-semibold sm:text-xl md:text-2xl ${
              errors?.username?.message ? 'text-errorColour' : 'text-ternary'
            }`}
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
            data-testid="usernameInput"
            id="username"
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
        </div>
        <div className="mb-4">
          <label
            className={`mb-2 block font-semibold sm:text-xl md:text-2xl ${
              errors?.email?.message ? 'text-errorColour' : 'text-ternary'
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            data-testid="emailInput"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
            id="email"
            type="text"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
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
            htmlFor="password"
          >
            Password
          </label>
          <input
            data-testid="passwordInput"
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
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
            data-testid="confirmPasswordInput"
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
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
            data-testid="signupButton"
            disabled={isSigningUp}
            className="hover:bg-blue-700 focus:shadow-outline rounded bg-ternary px-4 py-2 font-semibold text-primary focus:outline-none"
            type="submit"
          >
            {isSigningUp ? '...Signing up' : 'Register'}
          </button>
        </div>
      </form>
      <Link
        data-testid="loginLink"
        to="/login"
        className="text-semibold text-xl text-ternary hover:font-bold"
      >
        Already have an account? Login
      </Link>

      <p className="text-errorColour">* All fields are required</p>
      {errors.password && (
        <p className="text-errorColour">
          * {errors.password?.message?.toString()}
        </p>
      )}
      {errors.username && (
        <p className="text-errorColour">
          * {errors.username?.message?.toString()}
        </p>
      )}
      {errors.email && (
        <p className="text-errorColour">
          * {errors.email?.message?.toString()}
        </p>
      )}
      {errors.confirmPassword && (
        <p className="text-errorColour">
          * {errors.confirmPassword?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default SignUp;
