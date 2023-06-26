import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';

import { useAppDispatch } from '../../../redux/store';
import { clearWords } from '../../../redux/words/slice';

interface PageHeaderProps {
  name: string;
  title: string;
  handleModal: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  handleModal,
  name,
  title,
}) => {
  const isDesktop = useMediaQuery({ maxWidth: 650 });
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(clearWords());
  };

  return (
    <>
      <div className="header">
        <Link to="/" onClick={handleBack}>
          {isDesktop ? (
            <div className="icon">
              <IoChevronBackCircleOutline />
            </div>
          ) : (
            <button className="btnBack">
              <IoMdArrowRoundBack />
              return
            </button>
          )}
        </Link>

        <h1>{name}</h1>
        {isDesktop ? (
          <div className="icon" onClick={handleModal}>
            <RxPlusCircled />
          </div>
        ) : (
          <button onClick={handleModal} className="btnAdd">
            {`new ${title}`}
          </button>
        )}
      </div>
    </>
  );
};

export default PageHeader;
