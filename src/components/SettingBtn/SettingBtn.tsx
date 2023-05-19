import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

interface SettingBtnProps {
  openMenu: boolean;
  handleOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SettingBtn: React.FC<SettingBtnProps> = ({
  openMenu,
  handleClose,
  handleOpen,
}) => {
  return (
    <div>
      {!openMenu ? (
        <button onClick={handleOpen} className="btnSetting">
          <BsThreeDotsVertical />
        </button>
      ) : (
        <button onClick={handleClose} className="btnSetting">
          <IoMdClose />
        </button>
      )}
    </div>
  );
};

export default SettingBtn;
