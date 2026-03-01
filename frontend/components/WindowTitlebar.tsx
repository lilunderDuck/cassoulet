import stylex from "@stylexjs/stylex"
import type { ParentProps } from "solid-js"

const style = stylex.create({
  titlebar: {
    width: "100%",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    zIndex: 9,
    paddingInline: 5,
    gap: 10,
    position: "fixed"
  }
})

export function WindowTitlebar(props: ParentProps) {
  return (
    <div {...stylex.attrs(style.titlebar)} data-title-bar style="--wails-draggable: drag">
      {props.children}
    </div>
  )
}