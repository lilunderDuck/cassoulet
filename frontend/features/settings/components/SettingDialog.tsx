import { Portal } from "solid-js/web";
import { For } from "solid-js"

import stylex from "@stylexjs/stylex"
import { type SettingSectionConfig } from "../provider";
import { PauseIndicatorPreview, ProgressBarPreview } from "./stuff";
import SettingSection from "./SettingSection";
import { BsX } from "solid-icons/bs";
import type { app } from "../../../wailsjs/go/models";
import { ResetZoomPreview } from "./stuff/ResetZoomPreview";

const style = stylex.create({
  dialog: {
    display: "flex",
    justifyContent: "center",
    userSelect: "none",
    alignItems: "center"
  },
  dialog__content: {
    width: "41.25rem",
    height: "60%",
    paddingBlock: 10,
    paddingInline: 15,
    backgroundColor: "var(--crust)",
    borderRadius: 6
  },
  dialog__section: {
  },
  dialog__description: {
    fontSize: 14,
    color: "var(--subtext-1)"
  },
  dialog__settingName: {
    display: "flex",
    alignItems: "center"
  },
  dialog__switchContainer: {
    marginLeft: "auto"
  },
  dialog__settingText: {
    display: "flex",
    alignItems: "center"
  },
  dialog__closeButton: {
    marginLeft: "auto"
  },
  dialog__settingDivider: {
    width: "100%",
    height: 5,
    borderRadius: 6,
    backgroundColor: "var(--sky)",
    marginBlock: 10,
  }
})

interface ISettingDialogProps {
  close$(): void
}

export function SettingDialog(props: ISettingDialogProps) {
  const pageSetting: SettingSectionConfig[] = [
    ['showActuralProgress', {
      name$: "Show actural progress",
      description$: "When seeking the video, the actural progress will be shown seperately.",
      component$: ProgressBarPreview,
    }],
    ['showPauseIndicator', {
      name$: "Show pause indicator",
      description$: "Show a little pause icon on the top center of the video when it's paused/finished.",
      component$: PauseIndicatorPreview,
    }],
    ["SETTING_SEPERATOR$"],
    ['resetZoomOnGoingNextOrPrevItem', {
      name$: "Reset gallery zoom when going next or previous item.",
      description$: "[The name is obvious, don't ya?]. Turn this off if you don't want the app to reset the zoom everytime you go to the next or previous item.",
      component$: ResetZoomPreview
    }]
  ]

  return (
    <Portal>
      <dialog {...stylex.attrs(style.dialog)} closedby="any" open={true} data-should-fade-in="">
        <div {...stylex.attrs(style.dialog__content)} data-should-fade-and-zoom-in="" data-scrollbar data-scrollbar-vertical>
          <h1 {...stylex.attrs(style.dialog__settingText)}>
            Settings
            <div {...stylex.attrs(style.dialog__closeButton)}>
              <button data-button data-icon data-no-background onClick={props.close$}>
                <BsX />
              </button>
            </div>
          </h1>

          <For each={pageSetting}>
            {([propName, pageSetting]) => {
              if (propName === "SETTING_SEPERATOR$") {
                return <div {...stylex.attrs(style.dialog__settingDivider)} />
              }

              return <SettingSection {...pageSetting} propName$={propName as keyof app.SettingData} />
            }}
          </For>
        </div>
      </dialog>
    </Portal>
  )
}