import { useParams } from "@solidjs/router"
import { GoBackButton, WindowTitlebar } from "../../components"
import { GalleryItem, GalleryProvider, GalleryRoot } from "../../features/gallery"
import { SettingButton } from "../../features/settings"

interface IGalleryPageProps {
  // define your component props here
}

export default function GalleryPage(props: IGalleryPageProps) {
  const param = useParams()
  return (
    <GalleryRoot>
      <GalleryProvider id$={param.name!}>
        <GalleryItem />
      </GalleryProvider>
    </GalleryRoot>
  )
}