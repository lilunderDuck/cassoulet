import { createContext, createSignal, ParentProps, useContext, type Accessor, type JSX, type Setter } from "solid-js"
import { wrapFn } from "../../../utils"

interface IHomePageContext {
  currentPage$: Accessor<number>
  setCurrentPage$: Setter<number>
}

const Context = createContext<IHomePageContext>()

interface IHomePageProviderProps {
  // insert your context props here
}

export function HomePageProvider(props: ParentProps) {
  const [currentPage, setCurrentPage] = createSignal(0)

  setCurrentPage(parseInt(sessionStorage.getItem("cassoulet_current_page") ?? "0"))

  return (
    <Context.Provider value={{
      currentPage$: currentPage,
      setCurrentPage$: wrapFn(setCurrentPage, (newPage) => {
        sessionStorage.setItem("cassoulet_current_page", `${newPage}`)
      }),
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useHomePageContext() {
  return useContext(Context)!
}