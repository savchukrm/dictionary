import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../hooks/use-auth';
import { handleOpen } from '../../redux/modal/slice';

import ModeToggle from './DarkModeToggle';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const openModal = () => {
    dispatch(handleOpen());
  };

  return (
    <header>
      <div className="container">
        <div className={styles.headerRow}>
          <Link to="/">
            <h3 className={styles.headerLogo}>Meaningo</h3>
          </Link>
          <ul className={styles.headerBtnRow}>
            <ModeToggle />
            <Link to="/login">
              <button className={styles.headerBtn}>Log in</button>
            </Link>

            {isAuth ? (
              <button className={styles.headerBtn} onClick={openModal}>
                Log out
              </button>
            ) : (
              <Link to="/register">
                <button className={styles.headerBtn}>Sign up</button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
