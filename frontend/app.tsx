import type { ParentProps } from 'solid-js';

import { GoBackButton, WindowControl, WindowTitlebar } from './components';
import { SettingButton, SettingProvider } from './features/settings';

export default function App(props: ParentProps) {
  return (
    <>
      <WindowControl />
      <SettingProvider>
        {props.children}
      </SettingProvider>
    </>
  );
};
