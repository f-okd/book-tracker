import { FormEvent, useState } from 'react';
import { useUser } from '../auth/hooks/useUser';
import { useUpdateUser } from '../auth/hooks/useUpdateUser';
import toast from 'react-hot-toast';

const UpdateUsernameForm = () => {
  const user = useUser().user;
  const email = user?.email ?? '';
  const currentUsername = user?.user_metadata?.username ?? '';

  const { updateUser, isUpdatingUser } = useUpdateUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    if (username.length > 16) {
      toast.error('Username must be less than 16 characters');
      return;
    }

    updateUser({ username });
  };

  const [username, setUsername] = useState(currentUsername);
  return (
    <form
      className="my-3 rounded bg-secondary px-8 py-3 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className={`sm:text-l mb-2 block font-semibold `}
          htmlFor="username"
        >
          Email
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
          id="email"
          type="text"
          value={email}
          disabled={true}
        />
      </div>
      <div className="mb-4">
        <label
          className={`sm:text-l mb-2 block font-semibold `}
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          disabled={isUpdatingUser}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="hover:bg-blue-700 focus:shadow-outline rounded bg-ternary px-4 py-2 font-semibold text-primary focus:outline-none"
          type="submit"
          disabled={isUpdatingUser}
        >
          Update Username
        </button>
      </div>
    </form>
  );
};

export default UpdateUsernameForm;
