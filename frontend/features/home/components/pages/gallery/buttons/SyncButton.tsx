import { CgSync } from "solid-icons/cg";
import { toast } from "../../../../../solid-toast";
import { ResyncGallery } from "../../../../../../wailsjs/go/app/Exports";
import { SyncGalleryProgress } from "./SyncGalleryProgress";
import { useGalleryContext } from "../GalleryProvider";

interface ISyncButtonProps {
  // 
}

export function SyncButton(props: ISyncButtonProps) {
  const { resyncGallery$ } = useGalleryContext()

  const syncAllGallery = async() => {
    toast.promise(resyncGallery$(), {
      loading: (
        <div>
          Resyncing all gallery...
        </div>
      ),
      error: () => (
        <div></div>
      ),
      success: () => (
        <div>
          Syncing success
        </div>
      )
    }) 
  }
  
  return (
    <button data-button data-icon data-no-background onClick={syncAllGallery}>
      <CgSync />
    </button>
  )
}