import type { Component } from "solid-js"
import {} from "../../wailsjs/go/main/App"

export interface ISettingData {
  showActuralProgress: boolean
  showPauseIndicator: boolean
}

export type SettingSectionOptions = {
  name$: string
  description$: string
  component$: Component<SettingPageConfigProps>
}

export type SettingSectionConfig<T extends ISettingData = ISettingData> = Record<keyof T, SettingSectionOptions>

export type SettingPageConfigProps<T extends any = any> = { state$: T }