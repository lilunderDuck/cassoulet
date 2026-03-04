import { createContext, createEffect, createResource, createSignal, onCleanup, ParentProps, Show, useContext, type Accessor, type Resource } from "solid-js"
import { GetGalleryMetadata } from "../../../wailsjs/go/app/Exports"
import { app } from "../../../wailsjs/go/models"
import { SpinningCube } from "../../../components"

import stylex from "@stylexjs/stylex"
import { useRegisterGlobalShortcutHandler } from "../../../utils"

const style = stylex.create({
  loadingIcon: {
    width: "100%",
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

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

  const toNextItem = () => {
    setCurrentTimeIndex(prevItemIndex => {
      if (allGalleryItemsCount() === prevItemIndex - 1) {
        return allGalleryItemsCount()
      }

      return prevItemIndex + 1
    })

    updateCurrentItem()
  }

  const toPreviousItem = () => {
    setCurrentTimeIndex(prevItemIndex => {
      if (prevItemIndex <= 0) {
        return 0
      }

      return prevItemIndex - 1
    })

    updateCurrentItem()
  }
  
  const updateCurrentItem = () => {
    console.log("current item", currentItem())
  }

  useRegisterGlobalShortcutHandler((currentKey) => {
    switch (currentKey) {
      case "d":
      case "arrowright":
        toNextItem()
      break
          
      case "arrowleft":
      case "a":
        toPreviousItem()
      break
    }
  })

  createEffect(() => {
    if (!metadataResource()) return
    const currentIndex = currentItemIndex()
    setCurrentItem(metadataResource()!.entry[currentIndex])
  })

  return (
    <Context.Provider value={{
      metadata$: metadataResource,
      id$: props.id$,
      toNextItem$: toNextItem,
      toPreviousItem$: toPreviousItem,
      currentItem$: currentItem,
      currentItemIndex$: currentItemIndex
    }}>
      <Show when={metadataResource()} fallback={
        <div {...stylex.attrs(style.loadingIcon)}>
          <SpinningCube cubeSize$={40} />
        </div>
      }>
        {props.children}
      </Show>
    </Context.Provider>
  )
}

export function useGalleryContext() {
  return useContext(Context)!
}