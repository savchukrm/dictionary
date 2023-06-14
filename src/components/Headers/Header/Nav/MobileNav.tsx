import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BiMenu } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

import { useAppDispatch } from '../../../../redux/store';

import { handleOpen } from '../../../../redux/modal/slice';
import { useAuth } from '../../../../hooks/use-auth';

import styles from '../Header.module.css';

function MobileNav() {
  const [openNav, setOpenNav] = useState(false);

  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const openModal = () => {
    document.body.classList.add('modal-open');

    dispatch(handleOpen());
  };

  const handleOpenNav = () => {
    setOpenNav((prev) => !prev);
  };

  return (
    <nav className={styles.headerRow}>
      <Link to="/">
        <h3 className={styles.headerLogo}>Meaningo</h3>
      </Link>

      <button onClick={handleOpenNav} className={styles.openNav}>
        <BiMenu />
      </button>

      {openNav && (
        <div style={{ background: '#171935' }} className={styles.mobileNav}>
          <button onClick={handleOpenNav} className={styles.navClose}>
            <CgClose />
          </button>

          {isAuth && (
            <>
              <Link onClick={handleOpenNav} to="/lists">
                <button className={styles.headerBtn}>Lists</button>
              </Link>

              <Link onClick={handleOpenNav} to="/folders">
                <button className={styles.headerBtn}>Folders</button>
              </Link>
            </>
          )}

          {!isAuth && (
            <Link onClick={handleOpenNav} to="/login">
              <button className={styles.headerBtn}>Log in</button>
            </Link>
          )}

          {isAuth ? (
            <div onClick={handleOpenNav}>
              {' '}
              <button className={styles.headerBtn} onClick={openModal}>
                Log out
              </button>{' '}
            </div>
          ) : (
            <Link onClick={handleOpenNav} to="/register">
              <button className={styles.headerBtn}>Sign up</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default MobileNav;
