import { useUser } from '../auth/hooks/useUser';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateUsernameForm from './UpdateUsernameForm';

const Settings = () => {
  const user = useUser().user;
  const currentUsername = user?.user_metadata?.username ?? '';
  return (
    <main className="pt-1/3 flex min-h-screen flex-1 flex-col items-center justify-center border-4 border-solid border-ternary bg-primary">
      <p className="mb-6 text-3xl font-[600] text-ternary">
        Hello {currentUsername}
      </p>
      <p className="text-l font-semibold text-ternary">Update username</p>
      <UpdateUsernameForm />
      <p className="text-l font-semibold text-ternary">Update password</p>

      <UpdatePasswordForm />
    </main>
  );
};

export default Settings;
