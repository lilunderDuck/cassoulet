import stylex from "@stylexjs/stylex"
import { BsPlayFill, BsPauseFill, BsFullscreen } from "solid-icons/bs"
import { useVideoContext } from "../../provider"
import { onCleanup, Show } from "solid-js"
import "./VideoControls.css"
import { VideoProgress } from "./VideoProgress"
import { BiSolidVolumeFull } from "solid-icons/bi"

const style = stylex.create({
  controls: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    userSelect: "none",
    paddingInline: 10,
    paddingBottom: 5,
  },
  controls__content: {
    width: "100%",
    paddingInline: 10,
    paddingBlock: 5,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    gap: 10,
    transition: "0.15s ease-out",
    opacity: 0,
  }
})

interface IVideoControlsProps {
  // define your component props here
}

export function VideoControls(props: IVideoControlsProps) {
  const { videoState$, _setIsHoveredOverControls$, ref$, _setVideoState$, toggleFullscreen$ } = useVideoContext()

  const controlsContentClass = stylex.attrs(style.controls__content).class

  const togglePlaying = () => {
    if (videoState$() !== "playing") {
      _setVideoState$("playing")
      ref$()!.play()
    } else {
      _setVideoState$("paused")
      ref$()!.pause()
    }
  }

  const globalKeyboardShortcut = (keyboardEvent: KeyboardEvent) => {
    switch (keyboardEvent.key) {
      case " ":
        togglePlaying()
        break;
    
      default:
        console.log(keyboardEvent.key)
        break;
    }
  }

  document.addEventListener("keydown", globalKeyboardShortcut)
  onCleanup(() => {
    document.removeEventListener("keydown", globalKeyboardShortcut)
  })

  const goFullscreen = () => {
    toggleFullscreen$()
  }

  return (
    <div
      {...stylex.attrs(style.controls)}
      onMouseEnter={() => _setIsHoveredOverControls$(true)}
      onMouseLeave={() => _setIsHoveredOverControls$(false)}
    >
      <div class={`${controlsContentClass}`} id="video-controls">
        <button data-button data-icon data-no-background onClick={togglePlaying}>
          <Show when={videoState$() !== "playing"} fallback={<BsPauseFill />}>
            <BsPlayFill />
          </Show>
        </button>
        <button data-button data-icon data-no-background>
          <BiSolidVolumeFull />
        </button>
        <VideoProgress />
        <button data-button data-icon data-no-background onClick={goFullscreen}>
          <BsFullscreen />
        </button>
      </div>
    </div>
  )
}