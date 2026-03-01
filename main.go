package main

import (
	"embed"
	"video_player/backend/app"
	"video_player/backend/server"
	"video_player/backend/utils"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	utils.GetCurrentExecPath()

	go server.StartServer()

	// Create an instance of the app structure
	thisApp := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:     "(Scuffed) Video player",
		Width:     1024,
		Height:    600,
		Frameless: true,
		Windows: &windows.Options{
			WebviewUserDataPath: utils.CURRENT_PATH,
		},
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        thisApp.startup,
		Bind: []interface{}{
			thisApp,
			&app.Exports{},
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
