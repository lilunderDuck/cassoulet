import { A, useLocation } from "@solidjs/router";
import { BsArrowLeft } from "solid-icons/bs";
import type { ParentProps } from "solid-js";

interface IGoBackButtonProps {
  // define your component props here
}

export function GoBackButton(props: IGoBackButtonProps) {
  const location = useLocation()

  const isHomePage = () => location.pathname === "/"

  return (
    <A href="/">
      <button data-button data-icon data-no-background disabled={isHomePage()}>
        <BsArrowLeft />
      </button>
    </A>
  )
}