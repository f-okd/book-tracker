import { render, screen, waitFor } from '@testing-library/react';
import Button from './Button';
import { MemoryRouter, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ReactNode, useState } from 'react';

// Create a component that always returns the path
export const ShowPath = (): ReactNode => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

const ShowCount = (): ReactNode => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(1);
  };

  return (
    <p>
      {count}
      <Button type="ternary" onClick={handleClick}>
        Test
      </Button>
    </p>
  );
};

const link = (
  <Button to="/mybooks" type="ternary">
    Test
  </Button>
);

const RegularButton = ({ fn }: { fn: () => void }) => {
  return (
    <Button onClick={fn} type="ternary">
      Test
    </Button>
  );
};

describe('test for button', () => {
  it("should render link if button has a 'to' prop", () => {
    render(<MemoryRouter>{link}</MemoryRouter>);
    const testLink: HTMLAnchorElement = screen.getByRole('link', {
      name: /test/i,
    });
    expect(testLink).toBeInTheDocument();
    expect(testLink.href).toContain('/mybooks');
  });
  it('should navigate to whatever path is passed as prop', async () => {
    render(
      <MemoryRouter>
        {
          <>
            {link}
            <ShowPath />
          </>
        }
      </MemoryRouter>,
    );
    const button = screen.getByRole('link', { name: /test/i });
    const user = userEvent.setup();
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText('/mybooks')).toBeInTheDocument();
    });
  });
  it("should render a regular button if button doesn't have a 'to' prop", async () => {
    const mockOnClick = vi.fn();
    render(<RegularButton fn={mockOnClick} />);
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(button);
    expect(mockOnClick).toHaveBeenCalledOnce();
  });
  it('should call function passed to button once clicked', async () => {
    render(<ShowCount />);

    const button = screen.getByRole('button', { name: /test/i });
    const user = userEvent.setup();
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});
