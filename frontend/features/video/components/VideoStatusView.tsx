import stylex from "@stylexjs/stylex"
import { useVideoContext, type VideoErrorStatus } from "../provider"
import { Match, Show, Switch, type ParentProps } from "solid-js"
import { SpinningCube } from "../../../components"
import { BiSolidError } from "solid-icons/bi"

const style = stylex.create({
  view: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    userSelect: "none",
    backgroundColor: "var(--crust)"
  },
  video__errorDetailTexts: {
    textAlign: "center"
  }
})

interface IVideoStatusViewProps {
  // define your component props here
}

export function VideoStatusView(props: ParentProps<IVideoStatusViewProps>) {
  const { videoStatus$ } = useVideoContext()

  return (
    <Show when={videoStatus$().type !== "loaded"} fallback={props.children}>
      <div {...stylex.attrs(style.view)}>
        <Switch>
          <Match when={videoStatus$().type == "loading"}>
            <SpinningCube cubeSize$={40} />
          </Match>
          <Match when={videoStatus$().type == "error"}>
            <span>
              <BiSolidError size={50} />
            </span>
            <div {...stylex.attrs(style.video__errorDetailTexts)}>
              <div>Error while loading the video</div>
              <span>{(videoStatus$() as VideoErrorStatus).detail}</span>
            </div>
          </Match>
        </Switch>
      </div>
    </Show>
  )
}