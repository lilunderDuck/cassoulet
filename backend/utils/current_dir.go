package utils

import (
	"os"
	"path/filepath"
	"video_player/backend/debug"
)

var CURRENT_PATH = ""

func GetCurrentExecPath() string {
	if CURRENT_PATH == "" {
		executablePath, err := os.Executable()
		if err != nil {
			if debug.IS_ENABLED {
				debug.FatalLabel("cmd", err)
			} else {
				panic(err)
			}
		}

		CURRENT_PATH = filepath.Dir(executablePath)
	}

	return CURRENT_PATH
}
