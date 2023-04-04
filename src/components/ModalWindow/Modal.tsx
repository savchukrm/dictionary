import { useDispatch } from 'react-redux';
import { CgClose } from 'react-icons/cg';

import { handleClose } from '../../redux/modal/slice';
import { removeUser } from '../../redux/auth/slice';
import { clearList } from '../../redux/list/slice';

import styles from './Modal.module.css';

function Modal() {
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(handleClose());
    dispatch(removeUser());
    dispatch(clearList());
  };

  const onClose = () => {
    dispatch(handleClose());
  };

  return (
    <div className={styles.block}>
      <div className={styles.top}>
        <h3 className={styles.h3}>Are you sure you want to sign out?</h3>
        <button onClick={() => onClose()} className={styles.smallBtn}>
          <CgClose />
        </button>
      </div>
      <div className={styles.blockBtn}>
        <button onClick={() => onConfirm()} className={styles.btnYes}>
          Yes
        </button>
        <button onClick={() => onClose()} className={styles.btnNo}>
          No
        </button>
      </div>
    </div>
  );
}

export default Modal;
