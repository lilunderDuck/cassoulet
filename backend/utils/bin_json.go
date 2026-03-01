package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"video_player/backend/debug"

	"github.com/fxamacker/cbor/v2"
	// "github.com/klauspost/compress/zstd"
)

// Takes any kind of data (anyObject) and saves it to a file.
// It uses a special way to store the data (called CBOR) which makes it easy to read later.
//
// Parameters:
//   - path: The location where you want to save the file.
//   - anyObject: The data you want to save.
//
// Returns:
//   - An error if something went wrong while saving, or nil if it saved correctly.
func BSON_WriteFile(path string, anyObject any) (someError error) {
	if debug.IS_ENABLED {
		debug.InfoLabel("BSON", fmt.Sprintf("writing: %s", debug.FormatPath(path)))
	}

	dirToTheFile := filepath.Dir(path)
	if !IsDirectoryExist(dirToTheFile) {
		CreateDirectory(dirToTheFile)
	}

	binaryData, err := cbor.Marshal(anyObject)
	if err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("BSON", err)
		}

		return err
	}

	return WriteFile(path, binaryData)
}

// Reads data from a file that was saved using BSON_WriteFile.
// It puts the data into a variable (out) that you give it.
//
// Parameters:
//   - path: The location of the file you want to read.
//   - out: A variable where the data from the file will be stored.
//
// Returns:
//   - An error if something went wrong while reading, or nil if it read correctly.
func base_BSON_ReadFile(path string) (dataOut []byte, someError error) {
	dataFromDisk, err := os.ReadFile(path)
	if err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("BSON", err)
		}

		return nil, err
	}

	return dataFromDisk, nil
}

func BSON_ReadFile[T any](path string) (*T, error) {
	if debug.IS_ENABLED {
		debug.InfoLabel("BSON", fmt.Sprintf("read: %s", debug.FormatPath(path)))
	}

	data, err := base_BSON_ReadFile(path)
	if err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("BSON", err)
		}

		return nil, err
	}
	return BSON_Unmarshal[T](data)
}

// Anti-crashing: avoid cbor sometimes treating `map[string]any` as `map[any]any`,
// which is bad, because when we decided to read the data from disk,
// it just not works.
//
// Boys, the agony begins by this one single log:
//
//	FAT | json: unsupported type: map[interface {}]interface {}
var decoderOption = cbor.DecOptions{
	DefaultMapType: reflect.TypeFor[map[string]any](),
}

func BSON_Unmarshal[T any](in []byte) (*T, error) {
	decoderMode, err := decoderOption.DecMode()
	if err != nil {
		return nil, err
	}

	var out T
	err = decoderMode.Unmarshal(in, &out)
	if debug.IS_ENABLED {
		if err != nil {
			debug.ErrLabel("BSON", err)
		}
	}

	return &out, err
}
