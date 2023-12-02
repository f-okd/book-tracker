import { describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import Mininav from './Mininav';
import { useState } from 'react';
import { statusType } from '../BookListPage';
import userEvent from '@testing-library/user-event';

const TestEnv = () => {
  const [currStatus, setCurrStatus] = useState<statusType>('reading');

  const toggleStatus = (status: statusType): void => {
    setCurrStatus(status);
  };
  return (
    <>
      <Mininav toggleSetFilterBy={toggleStatus} />
      <div data-testid="statusOutput">{currStatus}</div>
    </>
  );
};

describe('test for mininav component', () => {
  it('should render the 4 different nav bar buttons: "read", "reading", "toRead", "dnf"', () => {
    render(<TestEnv />);

    expect(screen.getByRole('button', { name: 'Reading' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'To read list' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Finished' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Did not finish' }),
    ).toBeInTheDocument();
  });
  // Test env will always contain a div showing currently active status
  it('should change status after each button is clicked', async () => {
    render(<TestEnv />);

    const user = userEvent.setup();
    const readButton = screen.getByRole('button', { name: 'Finished' });
    const readingButton = screen.getByRole('button', { name: 'Reading' });
    const droppedButton = screen.getByRole('button', {
      name: 'Did not finish',
    });
    const toReadButton = screen.getByRole('button', { name: 'To read list' });

    await user.click(readButton);
    expect(screen.getByTestId('statusOutput')).toHaveTextContent('read');
    await user.click(readingButton);
    expect(screen.getByTestId('statusOutput')).toHaveTextContent('reading');
    await user.click(droppedButton);
    expect(screen.getByTestId('statusOutput')).toHaveTextContent('dnf');
    await user.click(toReadButton);
    expect(screen.getByTestId('statusOutput')).toHaveTextContent('toRead');
  });
});
