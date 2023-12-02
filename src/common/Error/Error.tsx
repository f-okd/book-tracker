import { Link } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

interface IError {
  message?: string;
}

const Error = ({ message }: IError) => {
  return message ? (
    <>
      <p data-testid="errorMessage" className="m-10 text-3xl text-ternary">
        🚨🚨🚨 Error: {message} 🚨🚨🚨
      </p>
      <Link to="/">Go home</Link>;
    </>
  ) : (
    //default error message
    <NotFound />
  );
};

export default Error;
