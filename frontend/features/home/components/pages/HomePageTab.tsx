import stylex from "@stylexjs/stylex"
import "./HomePageTab.css"
import { RiMediaCamera2Fill, RiMediaImage2Fill } from "solid-icons/ri"
import { OpenFileDialog } from "../../../../wailsjs/go/main/App"
import type { app, frontend } from "../../../../wailsjs/go/models"
import { useNavigate } from "@solidjs/router"
import { createResource, Show } from "solid-js"
import { GetHistoryEntryData, UpdateHistoryEntryData } from "../../../../wailsjs/go/app/Exports"
import { SpinningCube } from "../../../../components"
import { getFilenameFromUrl } from "../../../../utils"

const style = stylex.create({
  homePage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  homePage__clickToSelect: {
    marginTop: "15%",
    width: "70%"
  },
  homePage__clickToSelectBox: {
    border: "5px dashed var(--base)",
    width: "100%",
    height: "10rem",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    gap: 15,
    backgroundColor: "var(--surface-0)",
    color: "var(--subtext-0)"
  },
  homePage__history: {
    width: "85%",
    marginTop: "5rem"
  }
})

interface IHomePageTabProps {
  // define your component props here
}

export default function HomePageTab(props: IHomePageTabProps) {
  const goTo = useNavigate()
  const [historyResource] = createResource<app.HistoryEntryData[]>(GetHistoryEntryData)

  const openDialog = async() => {
    const path = await OpenFileDialog({
      Title: "Choose a image or video file",
      Filters: [
        { DisplayName: "videos file", Pattern: "*.mp4" },
        { DisplayName: "images file", Pattern: "*.png" },
      ]
    } as frontend.OpenDialogOptions)

    if (path == "") return

    UpdateHistoryEntryData([
      {
        timeOpened: Date.now(),
        name: getFilenameFromUrl(path),
        path
      } as app.HistoryEntryData,
      ...(historyResource() ?? [])
    ])
    goTo(`/video?path=${encodeURIComponent(path)}`)
  }

  return (
    <div {...stylex.attrs(style.homePage)} data-scrollbar data-scrollbar-vertical>
      <section {...stylex.attrs(style.homePage__clickToSelect)} id="clickToSelect">
        <h4 id="clickToSelect__header">
          Click to select a video or image
        </h4>
        <button 
          data-button 
          {...stylex.attrs(style.homePage__clickToSelectBox)} 
          id="clickToSelect__box"
          onClick={openDialog}
        >
          <RiMediaCamera2Fill size={70} />
          <RiMediaImage2Fill size={70} />
        </button>
      </section>

      <section {...stylex.attrs(style.homePage__history)}>
        <h4>History</h4>
        <Show when={historyResource()} fallback={
          <SpinningCube cubeSize$={20} />
        }>
          <Show when={historyResource()!.length == 0}>
            <div>There's no history here, try open something.</div>
          </Show>
        </Show>
      </section>
    </div>
  )
}