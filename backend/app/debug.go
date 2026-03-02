package app

import (
	"fmt"
	"strings"
	"video_player/backend/debug"
)

func PrintAllPaths() {
	verifierText := debug.FormatWith(debug.COLOR_MAGENTA, debug.STYLE_BOLD, "[verifier]")
	debug.InfoLabel("app", fmt.Sprintf(
		"%s all paths used in this app:",
		verifierText,
	))

	mainRootPaths := []string{
		debug.FormatPath(AppsPathLocation),
		debug.FormatPath(DataPathLocation),
	}

	debug.InfoLabel("app", fmt.Sprintf(
		"%s main root paths: %s",
		verifierText,
		strings.Join(mainRootPaths, "\n"),
	))

	otherPaths := []string{
		debug.FormatPath(settingFilePath),
		debug.FormatPath(galleryMetadataFilePath),
		debug.FormatPath(openedFilesHistoryFilePath),
		debug.FormatPath(galleryItemsPath),
	}

	debug.InfoLabel("app", fmt.Sprintf(
		"%s other paths: %s",
		verifierText,
		strings.Join(otherPaths, "\n"),
	))
}
