import { createContext, ParentProps, useContext } from "solid-js"
import { createStore, Store, type SetStoreFunction } from "solid-js/store"
import type { ISettingData } from "./data"

interface ISettingContext {
  setting$: Store<ISettingData>
  _setSetting$: SetStoreFunction<ISettingData>
}

const Context = createContext<ISettingContext>()

interface ISettingProviderProps {
  // insert your context props here
}

export function SettingProvider(props: ParentProps) {
  const [setting, setSetting] = createStore<ISettingData>({
    showActuralProgress: true,
    showPauseIndicator: true
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