import { ZoomAndPanProvider, ZoomButtonRow, ZoomDisplay } from "../../pan-and-zoom"
import { useGalleryContext } from "../provider"

import stylex from "@stylexjs/stylex"

const style = stylex.create({
  item: {
    width: "100%",
    height: "100%"
  },
  item__imageDisplay: {
    width: "100%",
    height: "100%",
    background: "center center no-repeat var(--item-url)",
    backgroundSize: "contain"
  }
})

interface IGalleryItemProps {
  // define your component props here
}

export function GalleryItem(props: IGalleryItemProps) {
  const { currentItem$, id$ } = useGalleryContext()

  return (
    <div {...stylex.attrs(style.item)}>
      <ZoomDisplay>
        <div {...stylex.attrs(style.item__imageDisplay)} style={`--item-url: url(${`http://localhost:30000/gallery/${id$}/entry/${currentItem$().fileName}`})`} />
      </ZoomDisplay>
    </div>
  )
}