import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="bg-ternary px-1 pt-1">
      <header className="bg-secondary">
        <nav className="flex flex-wrap items-center justify-between border-b border-stone-200 px-4 py-3 sm:px-6">
          <Link to="/" className="text-lg uppercase font-semibold">
            <img src="book.svg" width={35}></img>
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
            <Button to="/mybooks" type="ternary">
              Browse books
            </Button>
            <Button to="/dashboard" type="ternary">
              Dashboard
            </Button>
          </div>

          <div className="hidden items-center justify-right sm:ml-[4rem] sm:flex ">
            <Button to="/mybooks" type="ternary">
              My list
            </Button>
            <Button to="/dashboard" type="ternary">
              Dashboard
            </Button>
          </div>
        </nav>
      </header>
    </section>
  );
};

export default Header;
