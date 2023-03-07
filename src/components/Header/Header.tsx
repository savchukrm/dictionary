import ModeToggle from './DarkModeToggle';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.headerRow}>
          <h3 className={styles.headerLogo}>meaningo</h3>
          <ModeToggle />
          <ul className={styles.headerBtnRow}>
            <button className={styles.headerBtn}>Log In</button>
            <button className={styles.headerBtn}>Sign Up</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
