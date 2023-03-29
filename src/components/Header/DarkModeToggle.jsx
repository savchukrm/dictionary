import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../../redux/mode/slice';

import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

const ModeToggle = () => {
  const dispatch = useDispatch();

  const { mode } = useSelector((state) => state.mode);

  const toogleMode = () => {
    dispatch(changeMode());
  };

  return (
    <DarkModeToggle
      mode={mode}
      dark=""
      light=""
      size="sm"
      inactiveLabelColor="#fff"
      inactiveTrackColor="#262a62"
      inactiveTrackColorOnHover="##262a62"
      inactiveTrackColorOnActive="#171935"
      activeTrackColor="#171935"
      activeTrackColorOnHover="#171935"
      activeTrackColorOnActive="#fffff"
      inactiveThumbColor="#e2e8f0"
      activeThumbColor="#e2e8f0"
      onChange={toogleMode}
    />
  );
};

export default ModeToggle;
