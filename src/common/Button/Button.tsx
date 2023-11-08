import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IButton {
  children: string | ReactNode;
  disabled?: boolean;
  to?: string;
  type: 'primary' | 'ternary'; // Allow "primary" or "ternary"
}

function Button({ children, disabled, to, type }: IButton) {
  const base =
    'flex mb-2 sm:mb-0 sm:mr-4 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm rounded font-semibold uppercase tracking-widest disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' text-ternary bg-secondary',
    ternary: base + ' text-primary bg-ternary',
  };

  if (to)
    return (
      <Link to={to} className={styles[type as 'primary' | 'ternary']}>
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className={styles[type as 'primary' | 'ternary']}
    >
      {children}
    </button>
  );
}

export default Button;
