import { BsGearFill } from "solid-icons/bs";
import { createSignal, lazy, onCleanup, Show } from "solid-js";
import { SettingDialog } from "../components";

interface ISettingButtonProps {
  // define your component props here
}

export function SettingButton(props: ISettingButtonProps) {
  const [isShowing, setIsShowing] = createSignal(false)

  const closeDialog = () => setIsShowing(false)

  const Dialog = () => {
    onCleanup(closeDialog)

    return <SettingDialog close$={closeDialog} />
  }

  return (
    <>
      <button data-button data-icon data-no-background onClick={() => setIsShowing(true)}>
        <BsGearFill />
      </button>
      <Show when={isShowing()}>
        <Dialog />
      </Show>
    </>
  )
}