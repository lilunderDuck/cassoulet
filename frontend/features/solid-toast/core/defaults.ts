import type { IToasterProps, ToastOptions, ToastTimeouts } from '../util/toast'

export const defaultTimeouts: ToastTimeouts = {
  "BLANK$": 4000,
  "ERROR$": 4000,
  "SUCCESS$": 2000,
  "LOADING$": Infinity,
  "CUSTOM$": 4000,
};

export const defaultToastOptions: Required<ToastOptions> = {
  id: '',
  icon: '',
  unmountDelay: 500,
  duration: 3000,
  class: '',
  style: {},
  position: "TOP_RIGHT$",
  iconTheme: {},
};

export const defaultToasterOptions: IToasterProps = {
  position: "TOP_RIGHT$",
  toastOptions: defaultToastOptions,
  gutter: 8,
  containerStyle: {},
  containerClassName: '',
}