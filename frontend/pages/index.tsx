import stylex from "@stylexjs/stylex"
import { type ParentProps } from "solid-js"
import { HomePageContent, HomePageProvider, HomeSidebar } from "../features/home"
import { GoBackButton, WindowTitlebar } from "../components"
import { SettingButton } from "../features/settings"

const style = stylex.create({
  home: {
    width: "100%",
    height: "100%",
    userSelect: "none",
    display: "flex"
  }
})

export default function HomePage(props: ParentProps) {
  return (
    <HomePageProvider>
      <WindowTitlebar>
        <GoBackButton />
        <SettingButton />
      </WindowTitlebar>
      <div {...stylex.attrs(style.home)} data-scrollbar data-scrollbar-vertical>
        <HomeSidebar />
        <HomePageContent />
      </div>
    </HomePageProvider>
  )
}
