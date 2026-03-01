import type { ParentProps } from "solid-js"

interface ITooltipProps {
  label$: string
}

export function Tooltip(props: ParentProps<ITooltipProps>) {
  return (
    <>
      {props.children}
    </>
  )
}