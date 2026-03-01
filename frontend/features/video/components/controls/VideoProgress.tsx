import { Show } from "solid-js"
import { useVideoContext } from "../../provider"
import { secondsToHHMMSS, type EventHandler } from "../../../../utils"

import stylex from "@stylexjs/stylex"
import { useSettingContext } from "../../../settings"

const style = stylex.create({
  progress__duration: {
    fontSize: 14
  },
  progress__inputContainer: {
    position: "relative",
    width: "100%",
    height: 15,
    transition: "0.25s ease-out",
  },
  progress__input: {
    width: "100%",
    appearance: "none",
    height: 15,
    background: "linear-gradient(90deg, var(--progress-color) var(--progress), var(--surface-0) var(--progress))",
    // change input slider color
    accentColor: "var(--progress-color)",
    outline: "none",
    borderRadius: 6,
    "::-webkit-slider-thumb": {
      WebkitAppearance: 'none',
      appearance: 'none',
      width: 12,
      height: 20,
      borderRadius: 6,
      background: 'var(--progress-color)',
      boxShadow: 'none',
    }
  },
  progress__actualProgress: {
    backgroundColor: "var(--actual-progress-color)",
    borderRadius: 6,
    height: 10,
    width: "calc(var(--progress) - 12px)",
    position: "absolute",
    top: 5,
    opacity: 0.75
  },
})

interface IVideoProgressProps {
  // define your component props here
}

export function VideoProgress(props: IVideoProgressProps) {
  const { progress$, ref$ } = useVideoContext()
  const { setting$ } = useSettingContext()

  const getCurrentProgress = () => {
    return progress$.changedTime$() / progress$.totalDuration$() * 100
  }

  const getActualProgress = () => progress$.currentTime$() / progress$.totalDuration$() * 100

  const changeCurrentDuration: EventHandler<"input", "onInput"> = (inputEvent) => {
    progress$._setIsSeeking$(true)
    const newProgressPercentage = parseFloat(inputEvent.currentTarget.value)
    progress$._setChangedTime$(newProgressPercentage / 100 * progress$.totalDuration$())
  }

  const confirmChangeDuration: EventHandler<"input", "onChange"> = () => {
    ref$()!.currentTime = progress$.changedTime$()
    progress$._setIsSeeking$(false)
  }

  return (
    <>
      <span {...stylex.attrs(style.progress__duration)}>
        {secondsToHHMMSS(progress$.changedTime$())}
      </span>
      <div {...stylex.attrs(style.progress__inputContainer)}>
        <input
          {...stylex.attrs(style.progress__input)}
          type="range"
          step={0.00000000000001}
          value={getCurrentProgress()}
          onInput={changeCurrentDuration}
          onChange={confirmChangeDuration}
          style={`--progress:${getCurrentProgress()}%`}
        />
        <Show when={setting$.showActuralProgress}>
          <Show when={progress$.isSeeking$()}>
            <div 
              {...stylex.attrs(style.progress__actualProgress)}  
              style={`--progress:${getActualProgress()}%`}
            />
          </Show>
        </Show>
      </div>
      <span {...stylex.attrs(style.progress__duration)}>
        {secondsToHHMMSS(progress$.totalDuration$())}
      </span>
    </>
  )
}