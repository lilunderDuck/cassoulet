import stylex from "@stylexjs/stylex"

const style = stylex.create({
  dialog__description: {
    marginBottom: 5
  },
  dialog__warning: {
    color: "var(--yellow)"
  }
})

interface ISyncingGalleryItemDescriptionProps {
  // define your component props here
}

export default function SyncingGalleryItemDescription(props: ISyncingGalleryItemDescriptionProps) {
  return (
    <>
      <section>
        <p {...stylex.attrs(style.dialog__warning, style.dialog__description)}>
          Warning: it will take a while if you have a lot of gallery items.
        </p>
        <p {...stylex.attrs(style.dialog__description)}>
          This will resync all of the gallery items, in case some of your items does not show or you just manually imported a gallery.
        </p>
      </section>
      <p {...stylex.attrs(style.dialog__description)}>You want to continue?</p>
    </>
  )
}