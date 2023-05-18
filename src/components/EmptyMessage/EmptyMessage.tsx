import styles from './EmptyMessage.module.css';

interface EmptyMessageProps {
  handleModal: () => void;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ handleModal }) => {
  return (
    <div className={styles.content}>
      <h3>This folder has no sets yet</h3>
      <p>Organise your study sets with folders.</p>

      <button onClick={handleModal} className="btnSet">
        Add set
      </button>
    </div>
  );
};

export default EmptyMessage;
