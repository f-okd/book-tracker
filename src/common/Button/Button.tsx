import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IButton {
  children: string | ReactNode;
  disabled?: boolean;
  to?: string;
  type: 'small' | 'ternary'; // Allow "primary" or "ternary"
}

function Button({ children, disabled, to, type }: IButton) {
  const base =
    ' text-primary text-center bg-ternary rounded font-semibold uppercase tracking-widest disabled:cursor-not-allowed';

  const styles = {
    ternary:
      base +
      ' flex m-1 px-3 py-2 text-xs sm:mb-0 sm:mr-4 sm:px-4 sm:py-2 sm:text-sm',
    small:
      base +
      ' flex-1 w-20 m-1 sm:mb-0 py-2 text-xs rounded-full sm:px-4 sm:py-2 sm:text-sm  ',
  };

  if (to)
    return (
      <Link to={to} className={styles[type as 'small' | 'ternary']}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type as 'small' | 'ternary']}>
      {children}
    </button>
  );
}

export default Button;
