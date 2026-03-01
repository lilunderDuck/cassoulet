import { Match, Switch } from "solid-js"
import { TbZoomReset, TbZoomIn, TbZoomOut } from 'solid-icons/tb'
// ...
import stylex from "@stylexjs/stylex"
// ...
import { useZoomAndPanContext } from "./ZoomAndPanProvider"
import { Tooltip } from "../../components"

const style = stylex.create({
  wholeThing: {
    gap: 10,
    userSelect: "none",
    paddingInline: 10,
    paddingBlock: 5,
    display: "flex",
    alignItems: 'center',
    height: "var(--title-bar-thiccness)"
  },
  scaleText: {
    minWidth: '3rem'
  },
})

export function ZoomButtonRow() {
  const { unzoom$, zoom$, reset$, internal$ } = useZoomAndPanContext()

  return (
    <div {...stylex.attrs(style.wholeThing)}>
      <Tooltip label$="Reset to default zoom">
        <button data-button data-icon data-no-background onClick={reset$} disabled={internal$.zoomScale$() === 1}>
          <TbZoomReset size={16} />
        </button>
      </Tooltip>
      <div />
      <Tooltip label$="Zoom out">
        <button data-button data-icon data-no-background onClick={unzoom$} disabled={internal$.zoomScale$() === 0}>
          <TbZoomOut size={16} />
        </button>
      </Tooltip>
      <Tooltip label$="Zoom in">
        <button data-button data-icon data-no-background onClick={zoom$}>
          <TbZoomIn size={16} />
        </button>
      </Tooltip>
      <span {...stylex.attrs(style.scaleText)}>
        <Switch fallback={
          <>{internal$.zoomScale$()}x</>
        }>
          <Match when={internal$.zoomScale$() >= 5}>
            Absurdly large ({internal$.zoomScale$()}x)
          </Match>
          <Match when={internal$.zoomScale$() == 0}>
            *Vanished*
          </Match>
        </Switch>
      </span>
    </div>
  )
}