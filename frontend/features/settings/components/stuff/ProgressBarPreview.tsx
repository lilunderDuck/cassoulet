import { Show } from "solid-js";
import type { SettingPageConfigProps } from "../../../provider";

import stylex from "@stylexjs/stylex"

const style = stylex.create({
  progress: {
    marginTop: 20,
    paddingInline: 10
  },
  progress__inputContainer: {
    position: "relative",
    width: "100%",
    height: 20,
    transition: "0.25s ease-out",
  },
  progress__input: {
    width: "100%",
    appearance: "none",
    height: 20,
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
    height: 15,
    width: "calc(var(--progress) - 12px)",
    position: "absolute",
    top: 3,
    opacity: 0.75
  },
})

interface IProgressBarPreviewProps extends SettingPageConfigProps<boolean> {
  // define your component props here
}

export function ProgressBarPreview(props: IProgressBarPreviewProps) {
  return (
    <div {...stylex.attrs(style.progress)}>
      <div {...stylex.attrs(style.progress__inputContainer)}>
        <input
          {...stylex.attrs(style.progress__input)}
          type="range"
          step={0.00000000000001}
          style={`--progress:50%`}
        />
        <Show when={props.state$}>
          <div 
            {...stylex.attrs(style.progress__actualProgress)}  
            style={`--progress:80%`}
          />
        </Show>
      </div>
    </div>
  )
}