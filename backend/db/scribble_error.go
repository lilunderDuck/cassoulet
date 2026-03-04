package db

import "errors"

var (
	scribbleMissingCollection = errors.New("Missing collection - no place to save record!")
	scribbleMissingResource   = errors.New("Missing resource - unable to save record (no name)!")
)
