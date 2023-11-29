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
      toast.error('Username is too long');
      return;
    }

    updateUser({ username });
  };

  const [username, setUsername] = useState(currentUsername);
  return (
    <form
      className="bg-secondary shadow-md rounded px-8 py-3 my-3"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className={`block sm:text-l font-semibold mb-2 `}
          htmlFor="username"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          value={email}
          disabled={true}
        />
      </div>
      <div className="mb-4">
        <label
          className={`block sm:text-l font-semibold mb-2 `}
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary leading-tight focus:outline-none focus:shadow-outline"
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
          className="bg-ternary hover:bg-blue-700 text-primary font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
