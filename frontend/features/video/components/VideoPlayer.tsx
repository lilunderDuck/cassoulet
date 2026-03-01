import { For, onMount, Show } from "solid-js"
import { useVideoContext } from "../provider"
import type { EventHandler } from "../../../utils"
import "./VideoPlayer.css"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  videoPlayer: {
    width: "100%",
    "::cue": {
      fontSize: 26,
      lineHeight: 1
    }
  }
})

interface IVideoPlayerProps {
  src$?: string
}

export function VideoPlayer(props: IVideoPlayerProps) {
  const { _setVideoStatus$, _setRef$, _setVideoState$, subtitles$, isHoveredOverControls$, _bootstrap$ } = useVideoContext()

  const thisVideoIsLoaded = () => {
    _bootstrap$()
    _setVideoStatus$({ type: "loaded" })
  }

  const videoErrorWhileLoading: EventHandler<"video", "onError"> = (errorEvent) => {
    _setVideoStatus$({ type: "error", code: "TEST", detail: "File not found" })
  }

  return (
    <video
      src={props.src$}
      onLoadedData={thisVideoIsLoaded}
      onError={videoErrorWhileLoading}
      onEnded={() => _setVideoState$("finished")}
      crossorigin="anonymous"
      controls={false}
      controlslist="nodownload nofullscreen noplaybackrate"
      preload="metadata"
      ref={_setRef$}
      id={isHoveredOverControls$() ? "raise-subtitle-higher" : ""}
      {...stylex.attrs(style.videoPlayer)}
    >
      <Show when={subtitles$()}>
        <For each={subtitles$()}>
          {it => (
            <track
              default
              kind="captions"
              srclang={it.lang}
              src={it.name}
            />
          )}
        </For>
      </Show>
    </video>
  )
}