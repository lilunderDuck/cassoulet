package app

import (
	"path/filepath"
	"video_player/backend/utils"
)

type GalleryMetadata struct {
	Name        string             `json:"name,omitempty"`
	Icon        string             `json:"icon,omitempty"`
	Id          uint               `json:"id"`
	Description string             `json:"description,omitempty"`
	Entry       []GalleryItemEntry `json:"entry"`
}

type GalleryItemEntry struct {
	FileName string `json:"fileName"`
}

func (*Exports) GetGalleryMetadata(galleryId string) (*GalleryMetadata, error) {
	return utils.JSON_ReadFile[GalleryMetadata](
		filepath.Join(utils.CURRENT_PATH, "/data/video_player/gallery", galleryId, "meta.json"),
	)
}
