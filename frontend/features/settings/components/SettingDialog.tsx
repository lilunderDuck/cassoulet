import { Portal } from "solid-js/web";
import { createSignal, For } from "solid-js"

import stylex from "@stylexjs/stylex"
import { type SettingSectionConfig } from "../provider";
import { PauseIndicatorPreview, ProgressBarPreview } from "./stuff";
import SettingSection from "./SettingSection";
import { BsCameraReelsFill, BsX } from "solid-icons/bs";
import type { app } from "../../../wailsjs/go/models";
import "./SettingDialog.css"
import { RiMediaGalleryFill } from "solid-icons/ri";

const style = stylex.create({
  dialog: {
    display: "flex",
    justifyContent: "center",
    userSelect: "none",
    alignItems: "center"
  },
  dialog__content: {
    width: "50rem",
    height: "60%",
    paddingBlock: 10,
    paddingInline: 15,
    backgroundColor: "var(--crust)",
    borderRadius: 6
  },
  dialog__settingContent: {
    width: "100%",
    display: "flex",
    gap: 10
  },
  dialog__settingSidebar: {
    width: "13rem",
    flexShrink: 0
  },
  dialog__mainContent: {
    width: "100%"
  },
  dialog__settingSidebarButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 15,
    paddingBlock: 5,
    paddingInline: 10,
    marginBottom: 5
  },
  dialog__settingText: {
    display: "flex",
    alignItems: "center"
  },
  dialog__closeButton: {
    marginLeft: "auto"
  },
})

interface ISettingDialogProps {
  close$(): void
}

type SettingPagesConfig = Record<string, SettingSectionConfig[]>

export function SettingDialog(props: ISettingDialogProps) {
  const settingSidebar = [
    {
      name$: "Video",
      icon$: BsCameraReelsFill,
      id$: "video$"
    },
    {
      name$: "Gallery",
      icon$: RiMediaGalleryFill,
      id$: "gallery$"
    }
  ]

  const settingPages: SettingPagesConfig = {
    "video$": [
      ['showActuralProgress', {
        name$: "Show actural progress",
        description$: "When seeking the video, the actural progress will be shown seperately.",
        component$: ProgressBarPreview,
      }],
      ['showPauseIndicator', {
        name$: "Show pause indicator",
        description$: "Show a little pause icon on the top center of the video when it's paused/finished.",
        component$: PauseIndicatorPreview,
      }]
    ],
    "gallery$": [
      ['resetZoomOnGoingNextOrPrevItem', {
        name$: "Reset gallery zoom when going next or previous item.",
        description$: "[The name is obvious, don't ya?]. Turn this off if you don't want the app to reset the zoom everytime you go to the next or previous item.",
      }],
      ['rememberLastGalleryItem', {
        name$: "Remember last gallery item",
        description$: "Allow the app to \"remember\" what the last gallery item is. When you go back to a gallery, it show where you left off.",
      }]
    ]
  }

  const [currentTab, setCurrentTab] = createSignal("video$")

  return (
    <Portal>
      <dialog {...stylex.attrs(style.dialog)} closedby="any" open={true} data-should-fade-in="">
        <div {...stylex.attrs(style.dialog__content)} data-should-fade-and-zoom-in="">
          <h1 {...stylex.attrs(style.dialog__settingText)}>
            Settings
            <div {...stylex.attrs(style.dialog__closeButton)}>
              <button data-button data-icon data-no-background onClick={props.close$}>
                <BsX />
              </button>
            </div>
          </h1>

          <div {...stylex.attrs(style.dialog__settingContent)}>
            <aside {...stylex.attrs(style.dialog__settingSidebar)} id="settingDialog__sidebar">
              <For each={settingSidebar}>
                {it => (
                  <button 
                    {...stylex.attrs(style.dialog__settingSidebarButton)} 
                    data-button 
                    data-no-background 
                    data-is-current={it.id$ === currentTab()}
                    onClick={() => setCurrentTab(it.id$)}
                  >
                    <it.icon$ />
                    {it.name$}
                  </button>
                )}
              </For>
            </aside>
            <main {...stylex.attrs(style.dialog__mainContent)} data-scrollbar data-scrollbar-vertical>
              <For each={settingPages[currentTab()]}>
                {([propName, pageSetting]) => {
                  return <SettingSection {...pageSetting} propName$={propName as keyof app.SettingData} />
                }}
              </For>
            </main>
          </div>
        </div>
      </dialog>
    </Portal>
  )
}