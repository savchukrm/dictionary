import { useState } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

const ModeToggle = () => {
  const [mode, setMode] = useState('dark');
  return (
    <DarkModeToggle
      mode={mode}
      dark="Dark"
      light="Light"
      size="md"
      inactiveLabelColor="#ece9f4"
      inactiveTrackColor="#e2e8f0"
      inactiveTrackColorOnHover="#f8fafc"
      inactiveTrackColorOnActive="#cbd5e1"
      activeTrackColor="#334155"
      activeTrackColorOnHover="#411b9c"
      activeTrackColorOnActive="#0f172a"
      inactiveThumbColor="#411b9c"
      activeThumbColor="#e2e8f0"
      onChange={(mode) => {
        setMode(mode);
      }}
    />
  );
};

export default ModeToggle;
