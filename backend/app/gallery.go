package app

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"video_player/backend/debug"
	"video_player/backend/utils"
)

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

		metadata, err := this.generateMetadataFileIfNeeds(dirName)
		if err != nil {
			if debug.IS_ENABLED {
				debug.InfoLabel(DEBUG_LABEL_NAME, fmt.Sprintf("An error occurred while trying to process: %s, skipping...", dirName))
			}
			continue
		}

		this.CacheDb.Write(GALLERY_CACHE_COLLECTION_NAME, metadata.Name, metadata.PartialGalleryMetadata)
	}

	if debug.IS_ENABLED {
		debug.InfoLabel(DEBUG_LABEL_NAME, "Syncing done.")
	}

	return this.GetAllGalleries(), nil
}

const ERR_NOT_IN_CORRECT_STRUCTURE = "Failed to read gallery entry, not in the correct folder structure\nGallery id: %s\nOriginal error: %s"

//

func (this *Exports) generateMetadataFileIfNeeds(galleryId string) (*GalleryMetadata, error) {
	metadata, err := this.GetGalleryMetadata(galleryId)
	if err == nil {
		if debug.IS_ENABLED {
			debug.InfoLabel(DEBUG_LABEL_NAME, fmt.Sprintf("%s: has metadata file present", galleryId))
		}
		return metadata, this.validateGalleryMetadata(metadata)
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

	err = this.validateGalleryMetadata(metadata)
	if err != nil {
		return nil, err
	}

	return newMetadata, nil
}

func (this *Exports) validateGalleryMetadata(data *GalleryMetadata) error {
	if strings.Contains(data.Id, " ") {
		newDirName := utils.FormatDirName(data.Id)
		if err := os.Rename(
			filepath.Join(GalleryFolderPath, data.Id),
			filepath.Join(GalleryFolderPath, newDirName),
		); err != nil {
			if debug.IS_ENABLED {
				debug.ErrLabel(DEBUG_LABEL_NAME, err)
			}

			return err
		}
	}

	return nil
}

func (*Exports) GetGalleryMetadata(galleryId string) (*GalleryMetadata, error) {
	return utils.JSON_ReadFile[GalleryMetadata](fmt.Sprintf(GalleryMetadataFilePath, galleryId))
}

func (*Exports) SetGalleryMetadata(galleryId string, data *GalleryMetadata) error {
	return utils.JSON_WriteFile(fmt.Sprintf(GalleryMetadataFilePath, galleryId), data)
}
