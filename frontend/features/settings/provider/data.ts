import type { Component } from "solid-js"
import { app } from "../../../wailsjs/go/models"

export type SettingSectionOptions = {
  name$: string
  description$: string
  component$: Component<SettingPageConfigProps>
}

export type SettingSectionConfig = [keyof app.SettingData, SettingSectionOptions] | ["SETTING_SEPERATOR$"]

export type SettingPageConfigProps<T extends any = any> = { state$: T }