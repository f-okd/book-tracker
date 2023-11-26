import { useUser } from '../auth/hooks/useUser';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateUsernameForm from './UpdateUsernameForm';

const Settings = () => {
  const user = useUser().user;
  const currentUsername = user?.user_metadata?.username ?? '';
  return (
    <main className="bg-primary border-solid border-4 border-ternary flex-1 flex flex-col justify-center items-center pt-1/3 min-h-screen">
      <p className="text-ternary text-3xl font-[600]">
        Hello {currentUsername}
      </p>
      <p className="text-l text-ternary font-semibold">Update user data</p>
      <UpdateUsernameForm />
      <p className="text-l text-ternary font-semibold">Update password</p>

      <UpdatePasswordForm />
    </main>
  );
};

export default Settings;
