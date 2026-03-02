import { Description, useContext as useDialogContext } from "@corvu/dialog"
import stylex from "@stylexjs/stylex"
import { createSignal, Show } from "solid-js"
import SyncingGalleryItemDescription from "./SyncingGalleryItemDescription"
import { SyncingGalleryProgress } from "./SyncingGalleryProgress"
import { ResyncGallery } from "../../../../../../wailsjs/go/app/Exports"

const style = stylex.create({
  dialog__content: {
    width: "30rem"
  }
})

interface ISyncingGalleryItemDialogProps {
  // define your component props here
}

export default function SyncingGalleryItemDialog(props: ISyncingGalleryItemDialogProps) {
  const { setOpen } = useDialogContext()
  const [isLocked, setIsLocked] = createSignal(false)

  const startSyncing = () => {
    setIsLocked(true)
    ResyncGallery()
  }

  return (
    <div {...stylex.attrs(style.dialog__content)}>
      <h2>Syncing gallery items</h2>
      <Show when={!isLocked()} fallback={
        <SyncingGalleryProgress 
          numberOfSteps$={2} 
        />
      }>
        <SyncingGalleryItemDescription />
      </Show>
      <button disabled={isLocked()} data-button onClick={() => setOpen(false)}>
        I changed my mind
      </button>
      <button disabled={isLocked()} data-button onClick={startSyncing}>
        Absolutely, why not
      </button>
    </div>
  )
}