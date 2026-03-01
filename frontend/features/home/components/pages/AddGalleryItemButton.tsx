import { BsPlus } from "solid-icons/bs";

import stylex from "@stylexjs/stylex"

const style = stylex.create({
  button: {
    width: "12rem",
    height: "14.5rem",
    backgroundColor: "var(--base)",
    borderRadius: 6,
    border: "4px solid transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      borderColor: "var(--sky)"
    }
  }
})

interface IAddGalleryItemButtonProps {
  // define your component props here
}

export default function AddGalleryItemButton(props: IAddGalleryItemButtonProps) {
  return (
    <button {...stylex.attrs(style.button)} data-icon>
      <BsPlus size={50} />
    </button>
  )
}