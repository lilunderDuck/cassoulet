import { createRoot, createSignal } from 'solid-js'
import { 
  type IToasterProps,
  type Message, 
  type Toast, 
  type ToastHandler,
  type Renderable,
  type ValueOrFunction,
  type ToastOptions,
  type ToastType, 
} from '../util/toast'
import { 
  defaultToasterOptions, 
  defaultToastOptions, 
  defaultTimeouts 
} from './defaults'
import { 
  generateID, 
  resolveValue 
} from '../util'
import { dispatch, store } from './store'

export const [defaultOpts, setDefaultOpts] = createSignal<IToasterProps>(defaultToasterOptions)

export const createToast = (message: Message, type: ToastType = "BLANK$", options: ToastOptions): Toast => {
  const toastPosition = 
    options.position || 
    defaultOpts().toastOptions?.position || 
    defaultOpts().position || 
    defaultToastOptions.position
  // ...

  const toastDuration = 
    options.duration || 
    defaultOpts().toastOptions?.duration || 
    defaultTimeouts[type]
  // ...

  const toastStyle = {
    ...defaultToastOptions.style,
    ...defaultOpts().toastOptions?.style,
    ...options.style
  }

  return {
    ...defaultToastOptions,
    ...defaultOpts().toastOptions,
    ...options,
    type,
    message,
    pauseDuration: 0,
    createdAt: Date.now(),
    visible: true,
    id: options.id || generateID(),
    paused: false,
    style: toastStyle,
    duration: toastDuration,
    position: toastPosition,
  }
}

function createToastCreator(type?: ToastType): ToastHandler {
  return (message: Message, options: ToastOptions = {}) => (
    createRoot(() => {
      const existingToast = store.toasts.find((t) => t.id === options.id) as Toast
      const toast = createToast(message, type, { ...existingToast, duration: undefined, ...options })
      dispatch({ type: "UPSERT_TOAST$", toast })
      return toast.id
    })
  )
}

export const toast = (message: Message, opts?: ToastOptions) => createToastCreator("BLANK$")(message, opts)

toast.error = createToastCreator("ERROR$")
toast.success = createToastCreator("SUCCESS$")
toast.loading = createToastCreator("LOADING$")
toast.custom = createToastCreator("CUSTOM$")

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: "DISMISS_TOAST$",
    toastId,
  })
}

toast.promise = <T>(
  promise: Promise<T>,
  msgs: {
    loading: Renderable
    success: ValueOrFunction<Renderable, T>
    error: ValueOrFunction<Renderable, any>
  },
  opts?: ToastOptions
) => {
  const id = toast.loading(msgs.loading, { ...opts, duration: 2000, })

  const options: ToastOptions = { id, ...opts }

  promise
    .then((p) => {
      toast.success(resolveValue(msgs.success, p), options)
      return p
    })
    .catch((e) => {
      toast.error(resolveValue(msgs.error, e), options)
    })
  // 

  return promise
}

toast.remove = (toastId?: string) => {
  dispatch({
    type: "REMOVE_TOAST$",
    toastId,
  })
}