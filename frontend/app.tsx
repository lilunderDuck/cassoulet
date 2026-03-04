import type { ParentProps } from 'solid-js';

import { GoBackButton, WindowControl, WindowTitlebar } from './components';
import { SettingButton, SettingProvider } from './features/settings';
import { Toaster } from './features/solid-toast';

export default function App(props: ParentProps) {
  return (
    <>
      <WindowControl />
      <Toaster />
      <SettingProvider>
        {props.children}
      </SettingProvider>
    </>
  );
};
