import stylex from "@stylexjs/stylex"
import { createSignal, For, onCleanup } from "solid-js"
import { EventsOff, EventsOn } from "../../../../../../wailsjs/runtime/runtime"

const style = stylex.create({
  progress: {
    marginBlock: 10
  },
  progress__progressStepBarContainer: {
    display: "flex",
    paddingInline: 10,
    paddingBlock: 5,
    gap: 5
  },
  progress__progressStepBar: {
    width: "100%",
    height: 6,
    borderRadius: 6,
    backgroundColor: "var(--surface-0)"
  }
})

interface ISyncingGalleryProgressProps {
  numberOfSteps$: number
}

export function SyncGalleryProgress(props: ISyncingGalleryProgressProps) {
  const [currentStep, setCurrentStep] = createSignal()

  EventsOn("gallery__gatherItems", () => {
    // ...
  })

  onCleanup(() => {
    EventsOff(
      "gallery__gatherItems"
    )
  })

  return (
    <div {...stylex.attrs(style.progress)}>
      <div {...stylex.attrs(style.progress__progressStepBarContainer)}>
        <For each={new Array(props.numberOfSteps$).fill(0)}>
          {it => (
            <div data-finished={true} {...stylex.attrs(style.progress__progressStepBar)} />
          )}
        </For>
      </div>
    </div>
  )
}