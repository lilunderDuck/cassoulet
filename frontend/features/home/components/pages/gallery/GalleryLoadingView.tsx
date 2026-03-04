import stylex from "@stylexjs/stylex"
import { SpinningCube } from "../../../../../components"
import { useGalleryContext } from "./GalleryProvider"
import { Show, type ParentProps } from "solid-js"

const style = stylex.create({
  gallery__loadingView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: 15
  }
})

interface IGalleryLoadingViewProps {
  // define your component props here
}

export default function GalleryLoadingView(props: ParentProps<IGalleryLoadingViewProps>) {
  const { loadingStatus$ } = useGalleryContext()

  return (
    <Show when={loadingStatus$()} fallback={props.children}>
      <div {...stylex.attrs(style.gallery__loadingView)}>
        <SpinningCube cubeSize$={30} />
        <span>
          {loadingStatus$()?.message$}
        </span>
      </div>
    </Show>
  )
}