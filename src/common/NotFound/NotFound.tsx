import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <p
        data-testid="notFoundErrorMessage"
        className="m-10 text-3xl text-ternary"
      >
        🚨😒❌🚫 ERROR: Not Found 🚫❌😒🚨
      </p>
      <Link to="/">Go home</Link>;
    </>
  );
};

export default NotFound;
