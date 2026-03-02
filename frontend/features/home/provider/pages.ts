import type { Component } from "solid-js"
import { BiSolidHome } from "solid-icons/bi"
import { RiMediaGalleryFill } from "solid-icons/ri"
// ...
import HomePageTab from "../components/pages/HomePageTab"
import GalleryPageTab from "../components/pages/gallery/GalleryPageTab"
import { BsGearFill } from "solid-icons/bs"

export const SIDEBAR_ITEMS = [
  {
    name$: "Home",
    icon$: BiSolidHome,
    page$: 0
  },
  {
    name$: "Gallery",
    icon$: RiMediaGalleryFill,
    page$: 1
  }
]

export const ALL_PAGES: [number, Component][] = [
  [0, HomePageTab],
  [1, GalleryPageTab]
]