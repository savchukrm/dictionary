import { useState } from 'react';

import styles from './Form.module.css';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
  error: string;
}

const Form: React.FC<FormProps> = ({ title, handleClick, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState(false);

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newEmail = event.target.value;

    setIsValid(emailRegex.test(newEmail));

    setEmail(event.target.value);
  }

  return (
    <div className={styles.block}>
      {error && <p className={styles.error}>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="email"
      ></input>

      {!isValid && email.length > 3 && (
        <p className={styles.error}>Email is invalid</p>
      )}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      ></input>

      {password.length < 6 && password.length > 0 && (
        <p className={styles.error}>At least 6 characters in length</p>
      )}

      <button
        disabled={!isValid || password.length < 6}
        onClick={() => handleClick(email, password)}
      >
        {' '}
        {title}
      </button>
    </div>
  );
};

export default Form;
