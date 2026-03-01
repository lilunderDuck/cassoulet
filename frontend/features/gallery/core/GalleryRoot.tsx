import type { ParentProps } from "solid-js";
import { GoBackButton, WindowTitlebar } from "../../../components";
import { ZoomAndPanProvider, ZoomButtonRow } from "../../pan-and-zoom";
import { SettingButton } from "../../settings";

import stylex from "@stylexjs/stylex"

const style = stylex.create({
  root: {
    width: "100%",
    height: "100%"
  }
})

interface IGalleryRootProps {
  // define your component props here
}

export function GalleryRoot(props: ParentProps<IGalleryRootProps>) {
  return (
    <ZoomAndPanProvider>
      <WindowTitlebar>
        <GoBackButton />
        <SettingButton />
        <div />
        <ZoomButtonRow />
      </WindowTitlebar>
      <main data-app-content {...stylex.attrs(style.root)}>
        {props.children}
      </main>
    </ZoomAndPanProvider>
  )
}