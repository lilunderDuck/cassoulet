import { createSignal, Show } from "solid-js"
import { Portal } from "solid-js/web"
// ...
import stylex from "@stylexjs/stylex"
import "./WindowControl.css"
import minimizeIcon from "../assets/icons/min-w-10.png"
import maximizeIcon from "../assets/icons/max-w-10.png"
import restoreIcon from "../assets/icons/restore-w-10.png"
import closeIcon from "../assets/icons/close-w-20.png"
// ...
import { WindowFullscreen, WindowMinimise, WindowUnfullscreen } from "../wailsjs/runtime/runtime"
import { WindowClose } from "../wailsjs/go/main/App"
// ...

const style = stylex.create({
  titleBar: {
    display: "flex",
    alignItems: "center",
    height: "var(--title-bar-thiccness)",
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 1000,
    userSelect: "none"
  },
  titleBar__button: {
    outline: 'none',
    backgroundColor: 'transparent',
    width: 'var(--title-bar-thiccness)',
    height: 'var(--title-bar-thiccness)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--gray11)',
    borderRadius: '0 !important',
  },
  titleBar__otherButton: {
    paddingInline: 'var(--title-bar-button-padding)',
    ":hover": {
      backgroundColor: "var(--gray4)"
    }
  },
  titleBar__closeButton: {
    paddingInline: 'var(--title-bar-button-padding)',
    ":hover": {
      backgroundColor: "var(--red9)"
    }
  }
})

export function WindowControl() {
  const [isFullscreen, setIsFullscreen] = createSignal()

  return (
    <Portal>
      <div {...stylex.attrs(style.titleBar)} id="buttonRow">
        <div {...stylex.attrs(style.titleBar__otherButton)}>
          <button 
            {...stylex.attrs(style.titleBar__button)}
            onClick={WindowMinimise}
          >
            <img class="icon" src={minimizeIcon} draggable="false" />
          </button>
        </div>
        <div {...stylex.attrs(style.titleBar__otherButton)}>
          <button
            {...stylex.attrs(style.titleBar__button)}
            onClick={() => {
              setIsFullscreen(prev => !prev)
              isFullscreen() ? WindowFullscreen() : WindowUnfullscreen()
            }}
          >
            <img class="icon" src={isFullscreen() ? restoreIcon : maximizeIcon} draggable="false" />
          </button>
        </div>
        <div {...stylex.attrs(style.titleBar__closeButton)}>
          <button 
            {...stylex.attrs(style.titleBar__button)}
            onClick={WindowClose}
          >
            <img class="icon" src={closeIcon} draggable="false" />
          </button>
        </div>
      </div>
    </Portal>
  )
}