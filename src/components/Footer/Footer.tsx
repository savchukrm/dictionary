import { AiFillLinkedin } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <address>
            <div>
              <AiFillLinkedin />
              <a
                href="https://www.linkedin.com/in/savchukrm/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div>
              <MdEmail />
              <a href="mailto:rymmasavchuk@gmail.com">Email</a>
            </div>
          </address>
        </div>

        <div className={styles.api}>
          <a
            href="https://rapidapi.com/dpventures/api/wordsapi"
            target="_blank"
            rel="noreferrer"
          >
            Use API
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
