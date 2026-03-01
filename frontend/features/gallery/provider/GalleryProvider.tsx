import { createContext, createResource, createSignal, ParentProps, Show, useContext, type Accessor, type Resource } from "solid-js"
import { GetGalleryMetadata } from "../../../wailsjs/go/app/Exports"
import { app } from "../../../wailsjs/go/models"
import { SpinningCube } from "../../../components"

interface IGalleryContext {
  id$: string
  metadata$: Resource<app.GalleryMetadata>
  currentItem$: Accessor<app.GalleryItemEntry>
  currentItemIndex$: Accessor<number>
  toNextItem$(): void
  toPreviousItem$(): void
}

const Context = createContext<IGalleryContext>()

interface IGalleryProviderProps {
  id$: string
}

export function GalleryProvider(props: ParentProps<IGalleryProviderProps>) {
  const [metadataResource] = createResource(async() => {
    const data = await GetGalleryMetadata(props.id$)
    setCurrentItem(data.entry[currentItemIndex()])
    return data
  })
  
  const [currentItemIndex, setCurrentTimeIndex] = createSignal(0)
  const [currentItem, setCurrentItem] = createSignal({} as app.GalleryItemEntry)
  const allGalleryItemsCount = () => metadataResource()!.entry.length

  return (
    <Context.Provider value={{
      metadata$: metadataResource,
      id$: props.id$,
      toNextItem$() {
        setCurrentTimeIndex(prevItemIndex => {
          if (allGalleryItemsCount() === prevItemIndex - 1) {
            return allGalleryItemsCount()
          }

          return prevItemIndex + 1
        })
      },
      toPreviousItem$() {
        setCurrentTimeIndex(prevItemIndex => {
          if (prevItemIndex <= 0) {
            return 0
          }

          return prevItemIndex - 1
        })
      },
      currentItem$: currentItem,
      currentItemIndex$: currentItemIndex
    }}>
      <Show when={metadataResource()} fallback={
        <SpinningCube cubeSize$={40} />
      }>
        {props.children}
      </Show>
    </Context.Provider>
  )
}

export function useGalleryContext() {
  return useContext(Context)!
}