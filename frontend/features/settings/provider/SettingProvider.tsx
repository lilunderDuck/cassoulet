import { createContext, ParentProps, useContext } from "solid-js"
import { createStore, Store, type SetStoreFunction } from "solid-js/store"
import type { app } from "../../../wailsjs/go/models"

interface ISettingContext {
  setting$: Store<app.SettingData>
  _setSetting$: SetStoreFunction<app.SettingData>
}

const Context = createContext<ISettingContext>()

interface ISettingProviderProps {
  // insert your context props here
}

export function SettingProvider(props: ParentProps) {
  const [setting, setSetting] = createStore<app.SettingData>({
    showActuralProgress: true,
    showPauseIndicator: true,
    resetZoomOnGoingNextOrPrevItem: false,
    rememberLastGalleryItem: true
  })

  return (
    <Context.Provider value={{
      setting$: setting,
      _setSetting$: setSetting,
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useSettingContext() {
  return useContext(Context)!
}