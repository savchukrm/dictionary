import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/use-auth';

import { handleOpen } from '../../redux/modal/slice';

import ModeToggle from './DarkModeToggle';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const openModal = () => {
    dispatch(handleOpen());
  };

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
            {isAuth ? (
              <button className={styles.headerBtn} onClick={openModal}>
                log out
              </button>
            ) : (
              <Link to="/register">
                <button className={styles.headerBtn}>sign up</button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
