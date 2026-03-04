import { onCleanup } from "solid-js"

export function useRegisterGlobalShortcutHandler(fn: (currentKeyPressed: string) => any) {
  const handler = (keyboardEvent: KeyboardEvent) => {
    fn(keyboardEvent.key.toLowerCase())
  }

  document.addEventListener("keyup", handler)
  
  onCleanup(() => {
    document.removeEventListener("keyup", handler)
  })
}