import { useMediaQuery } from 'react-responsive';

import BrowserNav from './Nav/BrowserNav';
import MobileNav from './Nav/MobileNav';

const Header = () => {
  const isDesktop = useMediaQuery({ maxWidth: 650 });

  return (
    <header>
      <div className="container">
        {!isDesktop ? <BrowserNav /> : <MobileNav />}
      </div>
    </header>
  );
};

export default Header;
