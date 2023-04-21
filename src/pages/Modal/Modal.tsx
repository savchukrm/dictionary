import ModalWindow from '../../components/ModalWindow/ModalWindow';
import styles from './Modal.module.css';

const Modal = () => {
  return (
    <div className={styles.modal}>
      <ModalWindow />
    </div>
  );
};

export default Modal;
