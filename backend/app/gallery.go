package app

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"video_player/backend/debug"
	"video_player/backend/utils"
)

type PartialGalleryMetadata struct {
	Name        string             `json:"name,omitempty"`
	Icon        string             `json:"icon,omitempty"`
	Id          string             `json:"id"`
	Description string             `json:"description,omitempty"`
	Entry       []GalleryItemEntry `json:"entry"`
}

type GalleryMetadata struct {
	*PartialGalleryMetadata
	Entry []GalleryItemEntry `json:"entry"`
}

type GalleryItemEntry struct {
	FileName string `json:"fileName"`
}

var (
	GalleryFolderPath       = filepath.Join(DataPathLocation, "gallery")
	GalleryMetadataFilePath = filepath.Join(DataPathLocation, "gallery/%s/meta.json")
	GalleryItemsPath        = filepath.Join(DataPathLocation, "gallery/%s/entry")
)

const DEBUG_LABEL_NAME = "app/gallery"
const GALLERY_CACHE_COLLECTION_NAME = "gallery_items"

var DEFAULT_GALLERY_DATA = []PartialGalleryMetadata{}

func (this *Exports) GetAllGalleries() []PartialGalleryMetadata {
	allData, err := this.CacheDb.ReadAll(GALLERY_CACHE_COLLECTION_NAME)
	if err != nil {
		if debug.IS_ENABLED {
			debug.WarnLabel(DEBUG_LABEL_NAME, "There's some problem while getting all galleries, using default data...")
		}
		return DEFAULT_GALLERY_DATA
	}

	allMetadata := []PartialGalleryMetadata{}
	for _, data := range allData {
		var out PartialGalleryMetadata
		err = json.Unmarshal([]byte(data), &out)
		if err != nil {
			if debug.IS_ENABLED {
				debug.ErrLabel(DEBUG_LABEL_NAME, err)
			}
			continue
		}

		allMetadata = append(allMetadata, out)
	}

	return allMetadata
}

func (this *Exports) ResyncGallery() ([]PartialGalleryMetadata, error) {
	allGalleryFolder, err := os.ReadDir(GalleryFolderPath)
	if err != nil {
		if debug.IS_ENABLED {
			debug.FatalLabel(DEBUG_LABEL_NAME, fmt.Errorf("Failed to read directory\n%s", err.Error()))
		}
		return DEFAULT_GALLERY_DATA, nil
	}

	allGalleryMetadata := []PartialGalleryMetadata{}

	for _, dirEntry := range allGalleryFolder {
		dirName := dirEntry.Name()
		if !dirEntry.IsDir() {
			if debug.IS_ENABLED {
				debug.InfoLabel(DEBUG_LABEL_NAME, fmt.Sprintf("Skip: %s, not a directory", dirName))
			}
			continue
		}

		if debug.IS_ENABLED {
			debug.InfoLabel(DEBUG_LABEL_NAME, fmt.Sprintf("Found directory: %s", dirName))
		}

		metadata, err := this._generateMetadataFileIfNeeds(dirName)
		if err != nil {
			if debug.IS_ENABLED {
				debug.InfoLabel(DEBUG_LABEL_NAME, fmt.Sprintf("An error occurred while trying to process: %s, skipping...", dirName))
			}
			continue
		}

		allGalleryMetadata = append(allGalleryMetadata, *metadata.PartialGalleryMetadata)
		this.CacheDb.Write(GALLERY_CACHE_COLLECTION_NAME, metadata.Name, metadata.PartialGalleryMetadata)
	}

	if debug.IS_ENABLED {
		debug.InfoLabel(DEBUG_LABEL_NAME, "Syncing done.")
	}

	return allGalleryMetadata, nil
}

const ERR_NOT_IN_CORRECT_STRUCTURE = "Failed to read gallery entry, not in the correct folder structure\nGallery id: %s\nOriginal error: %s"

//

func (this *Exports) _generateMetadataFileIfNeeds(galleryId string) (*GalleryMetadata, error) {
	metadata, err := this.GetGalleryMetadata(galleryId)
	if err == nil {
		if debug.IS_ENABLED {
			debug.InfoLabel(DEBUG_LABEL_NAME, fmt.Sprintf("%s: has metadata file present", galleryId))
		}
		return metadata, nil
	}

	if debug.IS_ENABLED {
		debug.WarnLabel(DEBUG_LABEL_NAME, fmt.Sprintf("Missing metadata: %s, trying to regenerate...", galleryId))
	}

	entryFiles, err := os.ReadDir(fmt.Sprintf(GalleryItemsPath, galleryId))
	if err != nil {
		newError := fmt.Errorf(ERR_NOT_IN_CORRECT_STRUCTURE, galleryId, err.Error())
		if debug.IS_ENABLED {
			debug.ErrLabel(DEBUG_LABEL_NAME, newError)
		}

		return nil, newError
	}

	newMetadata := &GalleryMetadata{
		PartialGalleryMetadata: &PartialGalleryMetadata{
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
	return utils.JSON_ReadFile[GalleryMetadata](fmt.Sprintf(GalleryMetadataFilePath, galleryId))
}

func (*Exports) SetGalleryMetadata(galleryId string, data *GalleryMetadata) error {
	return utils.JSON_WriteFile(fmt.Sprintf(GalleryMetadataFilePath, galleryId), data)
}
