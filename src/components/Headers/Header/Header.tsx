import { useMediaQuery } from 'react-responsive';

import BrowserNav from './Nav/BrowserNav';
import MobileNav from './Nav/MobileNav';

const Header = () => {
  const isDesktop = useMediaQuery({ maxWidth: 650 });

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1,
        backgroundColor: '#171935',
      }}
    >
      <div className="container">
        {!isDesktop ? <BrowserNav /> : <MobileNav />}
      </div>
    </header>
  );
};

export default Header;
