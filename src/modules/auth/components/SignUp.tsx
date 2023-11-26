import { Link } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useSignUp } from '../hooks/useSignUp';

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
    <div className="flex flex-col justify-center items-center h-screen bg-primary">
      <p className="font-bold text-3xl pb-4">Sign Up</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className={`block sm:text-xl md:text-2xl font-semibold mb-2 ${
              errors?.username?.message ? 'text-errorColour' : 'text-ternary'
            }`}
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
        </div>
        <div className="mb-4">
          <label
            className={`block sm:text-xl md:text-2xl font-semibold mb-2 ${
              errors?.email?.message ? 'text-errorColour' : 'text-ternary'
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary leading-tight focus:outline-none focus:shadow-outline"
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
            disabled={isSigningUp}
            className="bg-ternary hover:bg-blue-700 text-primary font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isSigningUp ? '...Signing up' : 'Register'}
          </button>
        </div>
      </form>
      <Link
        to="/login"
        className="text-xl text-semibold hover:font-bold text-ternary"
      >
        Already have an account? Login
      </Link>

      <p className="text-errorColour">* All fields are required</p>
      <p className="text-errorColour">
        * Password's must match and be at least 8 characters long
      </p>
    </div>
  );
};

export default SignUp;
