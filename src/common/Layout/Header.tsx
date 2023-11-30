import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Logout from '../../modules/auth/components/Logout';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="bg-ternary px-1 pt-1">
      <header className="bg-secondary">
        <nav className="border-stone-200 flex flex-wrap items-center justify-between border-b px-4 py-3 sm:px-6">
          <Link to="/" className="text-lg font-semibold uppercase">
            <img src="/book.svg" width={35}></img>
          </Link>

          <button
            className="text-3xl sm:hidden"
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
            <Button to="/settings" type="ternary">
              Settings
            </Button>
          </div>

          <div className="justify-right hidden items-center sm:ml-[4rem] sm:flex ">
            <Button to="/mybooks" type="ternary">
              My list
            </Button>
            <Button to="/settings" type="ternary">
              Settings
            </Button>
            <Logout />
          </div>
        </nav>
      </header>
    </section>
  );
};

export default Header;
