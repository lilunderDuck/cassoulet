import { A } from "@solidjs/router"
import stylex from "@stylexjs/stylex"

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
  // define your component props here
}

export function GalleryItem(props: IGalleryItemProps) {
  return (
    <div {...stylex.attrs(style.item)}>
      <img 
        {...stylex.attrs(style.item__coverBackground)} 
        draggable={false} 
        loading="lazy" 
        src="http://localhost:30000/gallery/momokuri/entry/v1-c1.png"
      />
      <span {...stylex.attrs(style.item__name)}>
        Momokuri
      </span>
      <A draggable={false} {...stylex.attrs(style.item__linkHitbox)} href={`/gallery/momokuri`}></A>
    </div>
  )
}