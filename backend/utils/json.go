package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"video_player/backend/debug"
)

func JSON_ReadFile[T any](path string) (*T, error) {
	if debug.IS_ENABLED {
		debug.InfoLabel("JSON", fmt.Sprintf("read: %s", debug.FormatPath(path)))
	}

	dataFromDisk, err := os.ReadFile(path)
	if err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("JSON", err)
		}
		return nil, err
	}

	var out T
	err = json.Unmarshal(dataFromDisk, &out)

	return &out, err
}

func JSON_WriteFile(path string, data any) error {
	if debug.IS_ENABLED {
		debug.InfoLabel("JSON", fmt.Sprintf("write: %s", debug.FormatPath(path)))
	}

	binData, err := json.Marshal(data)
	if err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("JSON", err)
		}
		return err
	}

	return os.WriteFile(path, binData, 0677)
}
