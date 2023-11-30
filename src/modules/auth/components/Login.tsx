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
    <div className="flex h-screen flex-col items-center justify-center bg-primary">
      <p className="pb-4 text-3xl font-bold text-ternary">Login</p>
      <form
        onSubmit={handleLogin}
        className="mb-4 rounded bg-secondary px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label
            className="mb-2 block font-semibold text-ternary sm:text-xl md:text-2xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
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
            className="mb-2 block font-semibold text-ternary sm:text-xl md:text-2xl"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-ternary shadow focus:outline-none"
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
            className="hover:bg-blue-700 focus:shadow-outline rounded bg-ternary px-4 py-2 font-semibold text-primary focus:outline-none"
            type="submit"
          >
            {!isLoggingIn ? 'Sign In' : '....logging in'}
          </button>
        </div>
      </form>

      <Link
        to="/register"
        className="text-semibold text-xl text-ternary hover:font-bold"
      >
        Sign Up (Email)
      </Link>
      <div>
        <p className="text-semibold pt-4 text-xl text-ternary hover:font-bold">
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
