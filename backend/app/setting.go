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

var (
	settingFilePath = filepath.Join(DataPathLocation, "settings.dat")
)

func (*Exports) UpdateSettingData(newSetting *SettingData) error {
	err := utils.BSON_WriteFile(settingFilePath, newSetting)

	if debug.IS_ENABLED {
		if err != nil {
			debug.ErrLabel("app/setting", errors.New("Failed to save setting data"))
		}
	}

	return err
}
