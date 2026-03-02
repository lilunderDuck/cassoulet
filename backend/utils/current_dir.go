package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"video_player/backend/debug"
)

var CURRENT_PATH = ""

func TryGettingCurrentExecPath() string {
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

	if debug.IS_ENABLED {
		debug.InfoLabel("cmd", fmt.Sprintf("Current execuable directory is: %s", debug.FormatPath(CURRENT_PATH)))
	}

	return CURRENT_PATH
}

func CurrentExecPath(path ...string) string {
	if CURRENT_PATH == "" {
		TryGettingCurrentExecPath()
	}
	return CURRENT_PATH + "/" + filepath.Join(path...)
}
