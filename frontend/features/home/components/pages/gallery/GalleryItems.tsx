import { A } from "@solidjs/router"
import stylex from "@stylexjs/stylex"
import type { app } from "../../../../../wailsjs/go/models"
import { For } from "solid-js"
import { useGalleryContext } from "./GalleryProvider"

const style = stylex.create({
  item: {
    width: "12rem",
    height: "14.5rem",
    backgroundColor: "var(--base)",
    borderRadius: 6,
    position: "relative",
    border: "4px solid transparent",
    transition: "0.25s ease-out",
    ":hover": {
      borderColor: "var(--sky)"
    }
  },
  item__coverBackground: {
    width: "100%",
    objectFit: "cover",
    filter: "brightness(0.5)",
    borderRadius: 6
  },
  item__name: {
    position: "absolute",
    bottom: 0,
    paddingInline: 10,
    paddingBlock: 5
  },
  item__linkHitbox: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0
  }
})

interface IGalleryItemProps {

}

export function GalleryItems(props: IGalleryItemProps) {
  const { galleries$ } = useGalleryContext()
  
  return (
    <For each={galleries$()}>
      {it => (
        <div {...stylex.attrs(style.item)}>
          <img
            {...stylex.attrs(style.item__coverBackground)}
            draggable={false}
            loading="lazy"
            src={`http://localhost:30000/gallery/${it.id}/entry/${it.icon}`}
          />
          <span {...stylex.attrs(style.item__name)}>
            {it.name}
          </span>
          <A draggable={false} {...stylex.attrs(style.item__linkHitbox)} href={`/gallery/${it.id}`}></A>
        </div>
      )}
    </For>
  )
}