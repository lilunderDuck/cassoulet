import stylex from "@stylexjs/stylex"
import { useVideoContext, VideoProvider } from "../provider"
import type { ParentProps } from "solid-js"
import { VideoPlayer, VideoStatusView, VideoControls, VideoPauseIndicator } from "../components"

const style = stylex.create({
  video: {
    position: "relative",
    height: "100%"
  }
})

interface IVideoProps {
  src: string
}

export function Video(props: IVideoProps) {
  const Root = (props: ParentProps) => {
    const { videoState$ } = useVideoContext()
    return (
      <div {...stylex.attrs(style.video)} data-state={videoState$()}>
        {props.children}
      </div>
    )
  }

  return (
    <VideoProvider src$={props.src}>
      <Root>
        <VideoPlayer src$={props.src} />
        <VideoStatusView>
          <VideoControls />
        </VideoStatusView>
        <VideoPauseIndicator />
      </Root>
    </VideoProvider >
  )
}