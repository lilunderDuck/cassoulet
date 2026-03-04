package app

import (
	"context"
	"video_player/backend/db"
	"video_player/backend/debug"
	"video_player/backend/utils"
)

const APP_NAME = "cassoulet"

var (
	AppsPathLocation  = utils.CurrentExecPath("apps", APP_NAME)
	DataPathLocation  = utils.CurrentExecPath("data", APP_NAME)
	CachePathLocation = utils.CurrentExecPath("cache", APP_NAME)
)

type Exports struct {
	Ctx     context.Context
	CacheDb *db.Driver
}

func (this *Exports) Init() error {
	cacheDb, err := db.New(CachePathLocation+"/gallery_data", &db.Options{})
	if debug.IS_ENABLED {
		if err != nil {
			debug.ErrLabel("app", err)
		}
	}
	this.CacheDb = cacheDb
	return err
}

func (this *Exports) CleanUp() {
	this.CacheDb = nil
}
