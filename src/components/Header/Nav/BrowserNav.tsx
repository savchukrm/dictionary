import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../../hooks/use-auth';
import { handleOpen } from '../../../redux/modal/slice';

import styles from '../Header.module.css';

const BrowserNav = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const openModal = () => {
    dispatch(handleOpen());
  };

  return (
    <nav className={styles.headerRow}>
      <Link to="/">
        <h3 className={styles.headerLogo}>Meaningo</h3>
      </Link>
      <ul className={styles.headerBtnRow}>
        {isAuth && (
          <Link to="/lists">
            <button className={styles.headerBtn}>List</button>
          </Link>
        )}

        {!isAuth && (
          <Link to="/login">
            <button className={styles.headerBtn}>Log in</button>
          </Link>
        )}

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
    </nav>
  );
};

export default BrowserNav;
