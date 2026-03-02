package app

import (
	"video_player/backend/utils"
)

const APP_NAME = "cassoulet"

var (
	AppsPathLocation  = utils.CurrentExecPath("apps", APP_NAME)
	DataPathLocation  = utils.CurrentExecPath("data", APP_NAME)
	CachePathLocation = utils.CurrentExecPath("cache", APP_NAME)
)

type Exports struct{}
