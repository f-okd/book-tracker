import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import Logout from '../../../modules/auth/components/Logout';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="bg-ternary px-1 pt-1">
      <header className="bg-secondary">
        <nav className="border-stone-200 flex flex-wrap items-center justify-between border-b px-4 py-3 sm:px-6">
          <Link
            to="/"
            data-testid="homePageLink"
            className="text-lg font-semibold uppercase"
          >
            <img src="/book.svg" width={35} />
            <p>Home</p>
          </Link>

          <button
            data-testid="mobile-ButtonToggleDropDownMenu"
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
            <Button
              data-testid="mobile-ButtonMyList"
              to="/mybooks"
              type="ternary"
            >
              My List
            </Button>
            <Button
              data-testid="mobile-ButtonSettings"
              to="/settings"
              type="ternary"
            >
              My Settings
            </Button>
            <Logout />
          </div>

          <div className="justify-right hidden items-center sm:ml-[4rem] sm:flex ">
            <Button data-testid="buttonMyList" to="/mybooks" type="ternary">
              My list
            </Button>
            <Button data-testid="buttonSettings" to="/settings" type="ternary">
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
