import stylex from "@stylexjs/stylex"
import { RiMediaGalleryFill } from "solid-icons/ri";
import { GalleryItems } from "./GalleryItems";
import { AddGalleryItemButton, SyncButton } from "./buttons";
import { GalleryProvider } from "./GalleryProvider";
import GalleryLoadingView from "./GalleryLoadingView";

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
  },
  gallery__button: {
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

interface IGalleryPageTabProps {
  // define your component props here
}

export default function GalleryPageTab(props: IGalleryPageTabProps) {
  return (
    <GalleryProvider>
      <div {...stylex.attrs(style.gallery__headerWrap)}>
        <RiMediaGalleryFill size={30} />
        <h2 {...stylex.attrs(style.gallery__header)}>
          Gallery
        </h2>
        <div {...stylex.attrs(style.gallery__headerButtonRow)}>
          <SyncButton />
        </div>
      </div>
      <GalleryLoadingView>
        <div {...stylex.attrs(style.gallery__itemList)} data-scrollbar data-scrollbar-vertical>
          <GalleryItems />
          <AddGalleryItemButton />
        </div>
      </GalleryLoadingView>
    </GalleryProvider>
  )
}