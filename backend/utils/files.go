package utils

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"video_player/backend/debug"
)

// Makes a new folder at the given path. It will create all
// intermediate directories in the path if they do not already exist.
func CreateDirectory(path string) (makeDirError error) {
	if debug.IS_ENABLED {
		debug.InfoLabel("dir", fmt.Sprintf("Create directory: %s", path))
	}

	return os.MkdirAll(path, 0666)
}

// Checks if a file exists at the given path.
func IsFileExist(pathToFile string) (existOrNot bool) {
	_, err := os.Stat(pathToFile)
	if err == nil {
		return true
	}

	if errors.Is(err, fs.ErrNotExist) {
		return false
	}

	return false
}

// Checks if a directory exists at the given path.
func IsDirectoryExist(path string) (existOrNot bool) {
	info, err := os.Stat(path)
	if err == nil {
		return info.IsDir()
	}

	if os.IsNotExist(err) {
		return false
	}

	return false
}

// Writes the given data to a file at the specified path.
// It creates the file if it does not exist and overwrite it if it does.
func WriteFile(pathToFile string, stuff []byte) (writeError error) {
	if debug.IS_ENABLED {
		debug.InfoLabel("file", fmt.Sprintf("Write file: %s", pathToFile))
	}

	return os.WriteFile(pathToFile, stuff, os.ModePerm)
}
