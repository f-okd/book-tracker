import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary">
      <nav className="flex flex-wrap items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 sm:px-6">
        <Link to="/" className="text-lg uppercase font-semibold">
          Logo/Brand
        </Link>

        <button
          className="sm:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>

        <div
          className={`w-full sm:inline-flex ${
            isMenuOpen ? 'block' : 'hidden'
          } sm:hidden`}
        >
          <Button to="/" type="primary">
            Home
          </Button>
          <Button to="/browse" type="primary">
            Browse books
          </Button>
          <Button to="/dashboard" type="primary">
            Dashboard
          </Button>
        </div>

        <div className="hidden sm:ml-[4rem] sm:flex flex-grow items-center justify-right">
          <Button to="/" type="primary">
            Home
          </Button>
          <Button to="/browse" type="primary">
            Browse books
          </Button>
          <Button to="/dashboard" type="primary">
            Dashboard
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
