import stylex from "@stylexjs/stylex";
import { For } from "solid-js";
import { SIDEBAR_ITEMS, useHomePageContext } from "../provider";
import "./HomeSidebar.css"

const style = stylex.create({
  home__sidebar: {
    width: "20rem",
    flexShrink: 0,
    paddingBottom: 5,
    paddingTop: "calc(var(--title-bar-thiccness) + 5px)",
    paddingInline: 5,
  },
  home__sidebarItem: {
    display: "flex",
    paddingInline: 10,
    paddingBlock: 5,
    marginBottom: 5,
    gap: 10,
    alignItems: "center",
    width: "100%"
  }
})

interface IHomeSidebarProps {
  // define your component props here
}

export function HomeSidebar(props: IHomeSidebarProps) {
  const { currentPage$, setCurrentPage$ } = useHomePageContext()
  return (
    <aside {...stylex.attrs(style.home__sidebar)} id="sidebar">
      <For each={SIDEBAR_ITEMS}>
        {it => (
          <button data-is-current-page={currentPage$() == it.page$} data-button data-no-background {...stylex.attrs(style.home__sidebarItem)} onClick={() => {
            setCurrentPage$(it.page$)
          }}>
            <it.icon$ />
            {it.name$}
          </button>
        )}
      </For>
    </aside>
  )
}