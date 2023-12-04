import Button from '../../../common/Button/Button';
import { useLogout } from '../hooks/useLogout';

const Logout = () => {
  const { logout, isLoggingOut } = useLogout();
  return (
    <Button
      data-testid="logoutButton"
      disabled={isLoggingOut}
      onClick={logout}
      type="ternary"
    >
      {isLoggingOut ? '...' : 'Logout'}
    </Button>
  );
};

export default Logout;
