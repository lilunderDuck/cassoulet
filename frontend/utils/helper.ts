import type { JSX } from "solid-js"

type HTMLTags = keyof HTMLElementTagNameMap

export type Ref<T extends HTMLTags> = HTMLElementTagNameMap[T]

export type HTMLAttributes<ElementName extends HTMLTags> =
  JSX.HTMLElementTags[ElementName]
// ...

export type EventHandler<
  ElementName extends HTMLTags,
  EventName extends keyof HTMLAttributes<ElementName>
> =
  HTMLAttributes<ElementName>[EventName]
// ...