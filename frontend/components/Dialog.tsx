import { Content, Overlay, Portal, Root, Trigger, Close, type RootProps } from "@corvu/dialog"
import type { Component, ParentProps } from "solid-js"

import stylex from "@stylexjs/stylex"

const style = stylex.create({
  dialog__overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1500,
    backgroundColor: "var(--crust-50-opacity)"
  },
  dialog__content: {
    position: "absolute",
    zIndex: 1501,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    paddingInline: 15,
    paddingBlock: 10,
    borderRadius: 6,
    backgroundColor: "var(--mantle)"
  }
})

interface IDialogProps extends RootProps {
  // define your component props here
  Component$: Component
}

export function Dialog(props: ParentProps<IDialogProps>) {
  return (
    <Root {...props}>
      <Trigger as="div">
        {props.children}
      </Trigger>
      <Portal>
        <Close />
        <Overlay {...stylex.attrs(style.dialog__overlay)} />
        <Content {...stylex.attrs(style.dialog__content)}>
          <props.Component$ />
        </Content>
      </Portal>
    </Root>
  )
}