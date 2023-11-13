interface IError {
  message?: string;
}

const Error = ({ message }: IError) => {
  return message ? <h1>{message}</h1> : <h1>Not Found</h1>;
};

export default Error;
