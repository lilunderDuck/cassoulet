import { BsCaretLeft, BsCaretLeftFill, BsCaretRightFill } from "solid-icons/bs"
import { ZoomAndPanProvider, ZoomButtonRow, ZoomDisplay } from "../../pan-and-zoom"
import { useGalleryContext } from "../provider"

import stylex from "@stylexjs/stylex"

const style = stylex.create({
  item: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  item__imageDisplay: {
    width: "100%",
    height: "100%",
    background: "center center no-repeat var(--item-url)",
    backgroundSize: "contain"
  },
  item__goToButton: {
    position: "absolute",
    top: 0,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    marginTop: "var(--title-bar-thiccness)"
  },
  item__goToNextItemButton: {
    right: 0,
    paddingLeft: 10
  },
  item__goToPrevItemButton: {
    left: 0,
    paddingRight: 10
  },
  item__panAndZoomWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
  }
})

interface IGalleryItemProps {
  // define your component props here
}

export function GalleryItem(props: IGalleryItemProps) {
  const { currentItem$, id$, toNextItem$, toPreviousItem$ } = useGalleryContext()

  return (
    <div {...stylex.attrs(style.item)}>
      <div 
        {...stylex.attrs(style.item__goToButton, style.item__goToPrevItemButton)} 
        onClick={toPreviousItem$}
      >
        <button data-icon data-button data-no-background>
          <BsCaretLeftFill size={40} />
        </button>
      </div>
      <ZoomDisplay>
        <div 
          {...stylex.attrs(style.item__imageDisplay)} 
          style={`--item-url: url(${`http://localhost:30000/gallery/${id$}/entry/${currentItem$().fileName}`})`}
        />
      </ZoomDisplay>
      <div 
        {...stylex.attrs(style.item__goToButton, style.item__goToNextItemButton)}
        onClick={toNextItem$}
      >
        <button data-icon data-button data-no-background>
          <BsCaretRightFill size={40} />
        </button>
      </div>
    </div>
  )
}