package app

import (
	"fmt"
	"os"
	"path/filepath"
	"video_player/backend/debug"
	"video_player/backend/utils"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type PartialGalleryMetadata struct {
	Name        string             `json:"name,omitempty"`
	Icon        string             `json:"icon,omitempty"`
	Id          uint               `json:"id"`
	Description string             `json:"description,omitempty"`
	Entry       []GalleryItemEntry `json:"entry"`
}

type GalleryMetadata struct {
	PartialGalleryMetadata
	Entry []GalleryItemEntry `json:"entry"`
}

type GalleryItemEntry struct {
	FileName string `json:"fileName"`
}

var (
	galleryFolderPath       = filepath.Join(DataPathLocation, "gallery")
	galleryMetadataFilePath = filepath.Join(DataPathLocation, "gallery/%s/meta.json")
	galleryItemsPath        = filepath.Join(DataPathLocation, "gallery/%s/entry")
)

var DEFAULT_GALLERY_DATA = []PartialGalleryMetadata{}

func (*Exports) GetAllGalleries() []PartialGalleryMetadata {
	return []PartialGalleryMetadata{}
}

func (this *Exports) ResyncGallery() ([]PartialGalleryMetadata, error) {
	runtime.EventsEmit(this.Ctx, "gallery__gatherItems")
	allGalleryFolder, err := os.ReadDir(galleryFolderPath)
	if err != nil {
		if debug.IS_ENABLED {
			debug.FatalLabel("app/gallery", fmt.Errorf("Failed to read directory\n%s", err.Error()))
		}
		return DEFAULT_GALLERY_DATA, nil
	}

	for _, dirEntry := range allGalleryFolder {
		dirName := dirEntry.Name()
		if !dirEntry.IsDir() {
			if debug.IS_ENABLED {
				debug.InfoLabel("app/gallery", fmt.Sprintf("Skip: %s, not a directory", dirName))
			}
			continue
		}

		if debug.IS_ENABLED {
			debug.InfoLabel("app/gallery", fmt.Sprintf("Found directory: %s", dirName))
		}

		metadata, err := this._generateMetadataFileIfNeeds(dirName)
		if err != nil {
			if debug.IS_ENABLED {
				debug.InfoLabel("app/gallery", fmt.Sprintf("An error occurred while trying to process: %s, skipping...", dirName))
			}
			continue
		}

		this.CacheDb.Write("gallery_items", metadata.Name, metadata)
	}

	runtime.EventsEmit(this.Ctx, "gallery__fetchingMetadata")

	if debug.IS_ENABLED {
		debug.InfoLabel("app/gallery", "Syncing done.")
	}

	return []PartialGalleryMetadata{}, nil
}

const ERR_NOT_IN_CORRECT_STRUCTURE = "Failed to read gallery entry, not in the correct folder structure\nGallery id: %s\nOriginal error: %s"

//

func (this *Exports) _generateMetadataFileIfNeeds(galleryId string) (*GalleryMetadata, error) {
	metadata, err := this.GetGalleryMetadata(galleryId)
	if err == nil {
		if debug.IS_ENABLED {
			debug.InfoLabel("app/gallery", fmt.Sprintf("%s: has metadata file present", galleryId))
		}
		return metadata, nil
	}

	if debug.IS_ENABLED {
		debug.WarnLabel("app/gallery", fmt.Sprintf("Missing metadata: %s, trying to regenerate...", galleryId))
	}

	entryFiles, err := os.ReadDir(fmt.Sprintf(galleryItemsPath, galleryId))
	if err != nil {
		newError := fmt.Errorf(ERR_NOT_IN_CORRECT_STRUCTURE, galleryId, err.Error())
		if debug.IS_ENABLED {
			debug.ErrLabel("app/gallery", newError)
		}

		return nil, newError
	}

	newMetadata := &GalleryMetadata{
		PartialGalleryMetadata: PartialGalleryMetadata{
			Name: "Untitled",
		},
	}

	for _, entryFileName := range entryFiles {
		newMetadata.Entry = append(newMetadata.Entry, GalleryItemEntry{
			FileName: entryFileName.Name(),
		})
	}

	newMetadata.Icon = newMetadata.Entry[0].FileName

	err = this.SetGalleryMetadata(galleryId, newMetadata)
	if err != nil {
		return nil, err
	}

	return newMetadata, nil
}

func (*Exports) GetGalleryMetadata(galleryId string) (*GalleryMetadata, error) {
	return utils.JSON_ReadFile[GalleryMetadata](fmt.Sprintf(galleryMetadataFilePath, galleryId))
}

func (*Exports) SetGalleryMetadata(galleryId string, data *GalleryMetadata) error {
	return utils.JSON_WriteFile(fmt.Sprintf(galleryMetadataFilePath, galleryId), data)
}
