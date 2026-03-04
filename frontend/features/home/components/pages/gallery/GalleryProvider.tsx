import { createContext, createSignal, onCleanup, onMount, ParentProps, useContext, type Accessor } from "solid-js"
import { CleanUp, GetAllGalleries, Init, ResyncGallery } from "../../../../../wailsjs/go/app/Exports"
import type { app } from "../../../../../wailsjs/go/models"

type GalleryLoadingStatus = 
  { type$: "loading$" | "error$", message$: string } |
  undefined // finished
// 

interface IGalleryContext {
  galleries$: Accessor<app.PartialGalleryMetadata[]>
  resyncGallery$(): Promise<void>
  loadingStatus$: Accessor<GalleryLoadingStatus>
}

const Context = createContext<IGalleryContext>()

interface IGalleryProviderProps {
  // insert your context props here
}

export function GalleryProvider(props: ParentProps<IGalleryProviderProps>) {
  const [galleries, setGalleries] = createSignal<app.PartialGalleryMetadata[]>([])
  const [status, setStatus] = createSignal<GalleryLoadingStatus>({
    type$: "loading$",
    message$: ""
  })

  onMount(async() => {
    setStatus({ type$: "loading$", message$: "Awaiting gallery initialization" })
    await Init()
    setStatus({ type$: "loading$", message$: "Getting data..." })
    const data = await GetAllGalleries()
    setGalleries(data)
    setStatus(undefined)
  })

  onCleanup(async() => {
    await CleanUp()
  })

  const resyncGallery = async() => {
    const data = await ResyncGallery()
    setGalleries(data)
  }
  
  return (
    <Context.Provider value={{
      galleries$: galleries,
      resyncGallery$: resyncGallery,
      loadingStatus$: status
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useGalleryContext() {
  return useContext(Context)!
}