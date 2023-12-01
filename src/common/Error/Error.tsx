interface IError {
  message?: string;
}

const Error = ({ message }: IError) => {
  return message ? (
    <p data-testid="errorMessage" className="m-10 text-3xl text-ternary">
      🚨🚨🚨 Error: {message} 🚨🚨🚨
    </p>
  ) : (
    <p data-testid="errorMessage" className="m-10 text-3xl text-ternary">
      🚨😒❌🚫 ERROR: Not Found 🚫❌😒🚨
    </p>
  );
};

export default Error;
