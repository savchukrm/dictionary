import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../../redux/store';
import { handleOpen } from '../../../../redux/modal/slice';

import { useAuth } from '../../../../hooks/use-auth';

import styles from '../Header.module.css';

const BrowserNav = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const openModal = () => {
    document.body.classList.add('modal-open');
    dispatch(handleOpen());
  };

  return (
    <nav className={styles.headerRow}>
      <Link to="/">
        <h3 className={styles.headerLogo}>Meaningo</h3>
      </Link>
      <ul className={styles.headerBtnRow}>
        {isAuth && (
          <>
            <Link to="/lists">
              <button className={styles.headerBtn}>Lists</button>
            </Link>

            <Link to="/folders">
              <button className={styles.headerBtn}>Folders</button>
            </Link>
          </>
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
