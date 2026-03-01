import { BsPauseFill } from "solid-icons/bs";

import stylex from "@stylexjs/stylex"
import { Show } from "solid-js";
import { useSettingContext } from "../../settings";
import "./VideoIndicator.css"
import { useVideoContext } from "../provider";

const style = stylex.create({
  indicator: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    userSelect: "none",
    display: "flex",
    justifyContent: "center"
  },
  indicator__content: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: "50%",
    backgroundColor: "var(--base)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    transition: "0.25s ease-out"
  }
})

interface IVideoPauseIndicatorProps {
  // define your component props here
}

export function VideoPauseIndicator(props: IVideoPauseIndicatorProps) {
  const { videoState$ } = useVideoContext()
  const { setting$ } = useSettingContext()

  return (
    <Show when={setting$.showPauseIndicator}>
      <div {...stylex.attrs(style.indicator)}>
        <div
          {...stylex.attrs(style.indicator__content)}
          data-pause-indicator-showing={videoState$() !== "playing"}
        >
          <BsPauseFill />
        </div>
      </div>
    </Show>
  )
}