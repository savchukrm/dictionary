import { useState } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

const ModeToggle = () => {
  const [mode, setMode] = useState('dark');
  return (
    <DarkModeToggle
      mode={mode}
      dark="dark"
      light="light"
      size="md"
      inactiveLabelColor="#444444"
      inactiveTrackColor="#444444"
      inactiveTrackColorOnHover="#444444"
      inactiveTrackColorOnActive="#444444"
      activeTrackColor="#444444"
      activeTrackColorOnHover="#fffff"
      activeTrackColorOnActive="#fffff"
      inactiveThumbColor="#e2e8f0"
      activeThumbColor="#e2e8f0"
      onChange={(mode) => {
        setMode(mode);
      }}
    />
  );
};

export default ModeToggle;
