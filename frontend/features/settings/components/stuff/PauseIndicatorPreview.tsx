import stylex from "@stylexjs/stylex"
import { BsPauseFill } from "solid-icons/bs"
import { Show } from "solid-js"
import type { SettingPageConfigProps } from "../../../provider"

const style = stylex.create({
  indicator: {
    width: "100%",
    height: "7rem",
    display: "flex",
    justifyContent: "center",
    background: "repeating-linear-gradient(45deg, var(--surface-2), var(--surface-2) 10px, var(--surface-0) 10px, var(--surface-0) 20px)",
    marginTop: 10,
    borderRadius: 6
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

interface IPauseIndicatorPreviewProps extends SettingPageConfigProps<boolean> {
  // define your component props here
}

export function PauseIndicatorPreview(props: IPauseIndicatorPreviewProps) {
  return (
    <div {...stylex.attrs(style.indicator)}>
      <Show when={props.state$}>
        <div
          {...stylex.attrs(style.indicator__content)}
        >
          <BsPauseFill />
        </div>
      </Show>
    </div>
  )
}