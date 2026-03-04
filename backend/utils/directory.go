package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"video_player/backend/debug"
)

var CURRENT_PATH = ""

func TryGettingCurrentExecPath() string {
	if CURRENT_PATH == "" {
		executablePath, err := os.Executable()
		if err != nil {
			if debug.IS_ENABLED {
				debug.FatalLabel("dir", err)
			} else {
				panic(err)
			}
		}

		CURRENT_PATH = filepath.Dir(executablePath)
	}

	if debug.IS_ENABLED {
		debug.InfoLabel("dir", fmt.Sprintf("Current execuable directory is: %s", debug.FormatPath(CURRENT_PATH)))
	}

	return CURRENT_PATH
}

func CurrentExecPath(path ...string) string {
	if CURRENT_PATH == "" {
		TryGettingCurrentExecPath()
	}
	return CURRENT_PATH + "/" + filepath.Join(path...)
}

const DIRECTORY_NAME_MAX_LENGTH = 15

func FormatDirName(directoryName string) string {
	formatted := strings.ReplaceAll(directoryName, " ", "_")

	if len(formatted) > DIRECTORY_NAME_MAX_LENGTH {
		formatted = formatted[:DIRECTORY_NAME_MAX_LENGTH]
	}

	return fmt.Sprintf(
		"%s_%s",
		formatted,
		GetRandomString(7),
	)
}
