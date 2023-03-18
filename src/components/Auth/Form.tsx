import { useState } from 'react';

import styles from './Form.module.css';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.block}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      ></input>

      <button onClick={() => handleClick(email, password)}> {title}</button>
    </div>
  );
};

export default Form;
