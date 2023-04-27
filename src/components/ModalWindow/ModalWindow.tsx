import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CgClose } from 'react-icons/cg';

import { getAuth } from 'firebase/auth';

import { handleClose } from '../../redux/modal/slice';
import { removeUser } from '../../redux/auth/slice';
import { clearFavorite } from '../../redux/favorite/slice';
import { clearLists } from '../../redux/lists/slice';

import styles from './ModalWindow.module.css';

function ModalWindow(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();

  const onConfirm = () => {
    dispatch(handleClose());

    dispatch(clearFavorite());
    dispatch(clearLists());

    auth
      .signOut()
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });

    navigate('/');
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

export default ModalWindow;
