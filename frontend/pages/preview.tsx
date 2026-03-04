import stylex from "@stylexjs/stylex"
import { useSearchParams } from "@solidjs/router"
import { Video } from "../features/video"
import { GoBackButton, WindowTitlebar } from "../components"
import { SettingButton } from "../features/settings"

const style = stylex.create({
  home: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
})

export default function VideoPage() {
  const [searchParams] = useSearchParams()

  return (
    <>
      <WindowTitlebar>
        <GoBackButton />
        <SettingButton />
      </WindowTitlebar>
      <main {...stylex.attrs(style.home)} data-app-content>
        <Video src={`http://localhost:30000/local?path=${searchParams.path}`} />
      </main>
    </>
  )
}