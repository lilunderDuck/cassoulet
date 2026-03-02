package app

import (
	"fmt"
	"path/filepath"
	"video_player/backend/utils"
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
	galleryMetadataFilePath = filepath.Join(DataPathLocation, "gallery/%s/meta.json")
	galleryItemsPath        = filepath.Join(DataPathLocation, "gallery/%s/entry")
)

func (*Exports) GetAllGalleries() []PartialGalleryMetadata {
	return []PartialGalleryMetadata{}
}

func (*Exports) RefreshGallery() []PartialGalleryMetadata {
	return []PartialGalleryMetadata{}
}

func (*Exports) GetGalleryMetadata(galleryId string) (*GalleryMetadata, error) {
	return utils.JSON_ReadFile[GalleryMetadata](fmt.Sprintf(galleryMetadataFilePath, galleryId))
}
