import { Link } from 'react-router-dom';

import ModeToggle from './DarkModeToggle';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.headerRow}>
          <Link to="/">
            <h3 className={styles.headerLogo}>meaningo</h3>
          </Link>
          <ModeToggle />
          <ul className={styles.headerBtnRow}>
            <Link to="/login">
              <button className={styles.headerBtn}>log in</button>
            </Link>
            <Link to="/register">
              <button className={styles.headerBtn}>sign up</button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
