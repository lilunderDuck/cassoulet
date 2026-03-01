import { createContext, createEffect, createSignal, onMount, ParentProps, useContext, type Accessor, type Setter } from "solid-js"
import type { VideoState, VideoStatus } from "./types"
import type { Ref } from "../../../utils"
import { getThisVideoSubtitlePath, type VideoSubtitleData } from "./subtitle"
import { WindowFullscreen, WindowIsFullscreen, WindowUnfullscreen } from "../../../wailsjs/runtime/runtime"

interface IVideoContext {
  videoStatus$: Accessor<VideoStatus>
  _setVideoStatus$: Setter<VideoStatus>
  videoState$: Accessor<VideoState>
  _setVideoState$: Setter<VideoState>
  ref$: Accessor<Ref<"video"> | undefined>
  _setRef$: Accessor<Ref<"video"> | undefined>
  subtitles$: Accessor<VideoSubtitleData[]>
  isHoveredOverControls$: Accessor<boolean>
  _setIsHoveredOverControls$: Setter<boolean>
  _bootstrap$(): any
  isOnFullscreen$: Accessor<boolean>
  toggleFullscreen$(): Promise<void>
  progress$: {
    currentTime$: Accessor<number>
    _setCurrentTime$: Setter<number>
    changedTime$: Accessor<number>
    _setChangedTime$: Setter<number>
    totalDuration$: Accessor<number>
    _setIsSeeking$: Setter<boolean>
    isSeeking$: Accessor<boolean>
  }
}

const Context = createContext<IVideoContext>()

interface IVideoProviderProps {
  src$: string
}

export function VideoProvider(props: ParentProps<IVideoProviderProps>) {
  const [videoStatus, setVideoStatus] = createSignal<VideoStatus>({ type: "loading" })
  const [videoState, setVideoState] = createSignal<VideoState>("paused")
  const [videoRef, setVideoRef] = createSignal<Ref<"video">>()
  const [subtitles, setSubtitles] = createSignal<VideoSubtitleData[]>([])
  const [isHoveredOverControls, setIsHoveredOverControls] = createSignal(false)

  const [currentProgress, setCurrentProgress] = createSignal(0)
  const [totalDuration, setTotalDuration] = createSignal(0)
  const [isSeeking, setIsSeeking] = createSignal(false)
  const [changedTime, setChangedTime] = createSignal(0)

  const [isOnFullscreen, setIsOnFullscreen] = createSignal(false)

  const loadSubtitles = async() => {
    const subtitles = await getThisVideoSubtitlePath(props.src$)
    setSubtitles(subtitles)
  }

  createEffect(() => console.log("mouse hovered over controls: ", isHoveredOverControls()))
  createEffect(() => console.log("current", currentProgress(), "total", totalDuration()))

  onMount(() => {
    loadSubtitles()
  })

  const bootstrapStuff = () => {
    videoRef()!.addEventListener("timeupdate", (progressEvent) => {
      const currentTime = (progressEvent.currentTarget as HTMLVideoElement).currentTime
      if (!isSeeking()) {
        setChangedTime(currentTime)
      }
      setCurrentProgress(currentTime)
    })

    setTotalDuration(videoRef()!.duration)
    console.log("bootstrap completed")
  }

  const thisHtmlElement = document.getElementsByTagName("html")[0]
  const toggleFullscreen = async() => {
    setIsOnFullscreen(prev => !prev)
    if (isOnFullscreen()) {
      thisHtmlElement.classList.add("fullscreen")
      if (!await WindowIsFullscreen()) {
        WindowFullscreen()
      }
    } else {
      thisHtmlElement.classList.remove("fullscreen")
      WindowUnfullscreen()
    }
  }

  return (
    <Context.Provider value={{
      videoStatus$: videoStatus,
      _setVideoStatus$: setVideoStatus,
      videoState$: videoState,
      _setVideoState$: setVideoState,
      ref$: videoRef,
      _setRef$: setVideoRef,
      subtitles$: subtitles,
      isHoveredOverControls$: isHoveredOverControls,
      _setIsHoveredOverControls$: setIsHoveredOverControls,
      _bootstrap$: bootstrapStuff,
      isOnFullscreen$: isOnFullscreen,
      toggleFullscreen$: toggleFullscreen,
      progress$: {
        currentTime$: currentProgress,
        _setCurrentTime$: setCurrentProgress,
        totalDuration$: totalDuration,
        _setIsSeeking$: setIsSeeking,
        isSeeking$: isSeeking,
        changedTime$: changedTime,
        _setChangedTime$: setChangedTime
      }
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useVideoContext() {
  return useContext(Context)!
}