import { For, Match, Switch } from "solid-js"
import { ALL_PAGES, useHomePageContext } from "../provider"

import stylex from "@stylexjs/stylex"

const style = stylex.create({
  homePage: {
    width: "100%",
    height: "calc(100% - var(--title-bar-thiccness))",
    marginTop: "var(--title-bar-thiccness)",
    paddingInline: 15,
    paddingBlock: 10,
    borderTopLeftRadius: 6,
    backgroundColor: "var(--mantle)",
  }
})

interface IHomePageContentProps {
  // define your component props here
}

export function HomePageContent(props: IHomePageContentProps) {
  const { currentPage$ } = useHomePageContext()
  
  return (
    <main {...stylex.attrs(style.homePage)}>
      <Switch>
        <For each={ALL_PAGES}>
          {([pageIndex, PageComponent]) => (
            <Match when={currentPage$() === pageIndex}>
              <PageComponent />
            </Match>
          )}
        </For>
      </Switch>
    </main>
  )
}