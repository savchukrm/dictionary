import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from './Form.module.css';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
  error: string;
  viaGoogle: () => void;
}

const FormBlock: React.FC<FormProps> = ({
  title,
  handleClick,
  error,
  viaGoogle,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+\-\/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      setIsEmailValid(false);
      setEmailError('Required');
    } else if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setEmailError('Invalid email address');
    } else {
      setIsEmailValid(true);
      setEmailError('');
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setIsPasswordValid(false);
      setPasswordError('Required');
    } else if (/\s/.test(password)) {
      setIsPasswordValid(false);
      setPasswordError('Password cannot contain spaces');
    } else if (password.length < 6) {
      setIsPasswordValid(false);
      setPasswordError('At least 6 characters in length');
    } else {
      setIsPasswordValid(true);
      setPasswordError('');
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    validateEmail(newEmail);
    setEmail(newEmail);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    validatePassword(newPassword);
    setPassword(newPassword);
  };

  const handleSubmit = () => {
    console.log('a');
    if (isEmailValid && isPasswordValid) {
      handleClick(email, password);
    }
  };

  return (
    <div className={styles.block}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.formGroup}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="email"
        />
        {!isEmailValid && emailError && (
          <div className={styles.error}>{emailError}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
        {!isPasswordValid && passwordError && (
          <div className={styles.error}>{passwordError}</div>
        )}
      </div>

      <button
        className={styles.btnForm}
        disabled={!isEmailValid || !isPasswordValid}
        onClick={handleSubmit}
      >
        {title}
      </button>

      <p className={styles.or}>or</p>

      <button className={styles.btnGoogle} onClick={viaGoogle}>
        <FcGoogle /> {title} with Google
      </button>
    </div>
  );
};

export default FormBlock;
