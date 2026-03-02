import { For } from "solid-js";

import stylex from "@stylexjs/stylex"
import { RiMediaGalleryFill } from "solid-icons/ri";
import { GalleryItem } from "./GalleryItem";
import AddGalleryItemButton from "./AddGalleryItemButton";
import { CgSync } from "solid-icons/cg";

const style = stylex.create({
  gallery: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  gallery__section: {
    width: "100%",
    height: "100%",
  },
  gallery__headerWrap: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 15,
    marginBottom: 10
  },
  gallery__header: {
    flexShrink: 0
  },
  gallery__headerButtonRow: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    paddingInline: 5,
    width: "100%",
    gap: 5
  },
  gallery__itemList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10
  }
})

interface IGalleryPageTabProps {
  // define your component props here
}

export default function GalleryPageTab(props: IGalleryPageTabProps) {
  return (
    <>
      <div {...stylex.attrs(style.gallery__headerWrap)}>
        <RiMediaGalleryFill size={30} />
        <h2 {...stylex.attrs(style.gallery__header)}>
          Gallery
        </h2>
        <div {...stylex.attrs(style.gallery__headerButtonRow)}>
          <button data-button data-icon data-no-background>
            <CgSync />
          </button>
        </div>
      </div>
      <div {...stylex.attrs(style.gallery__itemList)} data-scrollbar data-scrollbar-vertical>
        <GalleryItem />
        <AddGalleryItemButton />
      </div>
    </>
  )
}