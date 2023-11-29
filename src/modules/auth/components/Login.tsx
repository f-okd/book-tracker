import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import { supabaseSignInWithGoogle } from '../../../services/supabase/apiAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggingIn } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-primary">
      <p className="font-bold text-3xl pb-4 text-ternary">Login</p>
      <form
        onSubmit={handleLogin}
        className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-ternary sm:text-xl md:text-2xl font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            disabled={isLoggingIn}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-ternary sm:text-xl md:text-2xl font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-ternary mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            disabled={isLoggingIn}
            className="bg-ternary hover:bg-blue-700 text-primary font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {!isLoggingIn ? 'Sign In' : '....logging in'}
          </button>
        </div>
      </form>

      <Link
        to="/register"
        className="text-xl text-semibold hover:font-bold text-ternary"
      >
        Sign Up (Email)
      </Link>
      <div>
        <p className="text-xl pt-4 text-semibold hover:font-bold text-ternary">
          Alternatively...
        </p>
        <Button type="ternary" onClick={supabaseSignInWithGoogle}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
