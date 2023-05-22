import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { RxPlusCircled } from 'react-icons/rx';
import { BsCardText } from 'react-icons/bs';

import styles from './FolderHeader.module.css';
import { TermItems } from '../../redux/folder/slice';

interface FolderHeaderProps {
  terms: TermItems[];
  folderName: string | undefined;
  description: string;
  handleClearFolder: () => void;
  handleOpenModalCreate: () => void;
  handleCreateFlashcardList: () => void;
}

const FolderHeader: React.FC<FolderHeaderProps> = ({
  terms,
  folderName,
  description,
  handleClearFolder,
  handleOpenModalCreate,
  handleCreateFlashcardList,
}) => {
  const isDesktop = useMediaQuery({ maxWidth: 650 });

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <Link to="/folders">
          <button onClick={handleClearFolder} className="btnBack">
            <IoMdArrowRoundBack />
            return
          </button>
        </Link>

        <div className={styles.header}>
          <div>
            <div className={styles.title}>
              <AiOutlineFolderOpen />
              <h2>{folderName}</h2>
            </div>
          </div>

          {terms && terms.length >= 1 && (
            <div onClick={handleOpenModalCreate}>
              {isDesktop ? (
                <div className="icon">
                  <RxPlusCircled />
                </div>
              ) : (
                <button className="btnSet">Add set</button>
              )}
            </div>
          )}

          {terms && terms.length >= 1 && (
            <div onClick={handleCreateFlashcardList}>
              <Link to="/flashcard">
                {isDesktop ? (
                  <div className="icon">
                    <BsCardText />
                  </div>
                ) : (
                  <button className="btnAdd btnFlashcard">Flashcards</button>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default FolderHeader;
