package app

import (
	"errors"
	"path/filepath"
	"time"
	"video_player/backend/debug"
	"video_player/backend/utils"
)

type HistoryEntryData struct {
	Name       string    `json:"name"`
	Path       string    `json:"path"`
	TimeOpened time.Time `json:"timeOpened"`
}

func (*Exports) UpdateHistoryEntryData(newEntry []HistoryEntryData) error {
	err := utils.BSON_WriteFile(
		filepath.Join(utils.CURRENT_PATH, DATA_PATH_LOCATION, "history.dat"),
		newEntry,
	)

	if debug.IS_ENABLED {
		if err != nil {
			debug.ErrLabel("history", errors.New("Failed to save setting data"))
		}
	}

	return err
}

func (*Exports) GetHistoryEntryData() []HistoryEntryData {
	data, err := utils.BSON_ReadFile[[]HistoryEntryData](filepath.Join(utils.CURRENT_PATH, DATA_PATH_LOCATION, "history.dat"))
	if err != nil {
		if debug.IS_ENABLED {
			debug.WarnLabel("history", "it seems like there's no history data, using default value...")
		}

		return []HistoryEntryData{}
	}
	return *data
}
