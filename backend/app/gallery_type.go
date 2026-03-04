package app

import "path/filepath"

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
