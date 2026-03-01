package app

import (
	"errors"
	"path/filepath"
	"video_player/backend/debug"
	"video_player/backend/utils"
)

type SettingData struct {
	ShowActuralProgress bool `json:"showActuralProgress" cbor:"0,keyasint"`
	ShowPauseIndicator  bool `json:"showPauseIndicator"  cbor:"1,keyasint"`
}

func (*Exports) UpdateSettingData(newSetting *SettingData) error {
	err := utils.BSON_WriteFile(
		filepath.Join(utils.CURRENT_PATH, DATA_PATH_LOCATION, "settings.dat"),
		newSetting,
	)

	if debug.IS_ENABLED {
		if err != nil {
			debug.ErrLabel("setting", errors.New("Failed to save setting data"))
		}
	}

	return err
}
