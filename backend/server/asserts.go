package server

import (
	"fmt"
	"net/http"
	"path/filepath"
	"video_player/backend/app"
)

func createAssetsRoute(server *http.ServeMux) {
	server.HandleFunc("/local", func(res http.ResponseWriter, req *http.Request) {
		requestedFile := req.URL.Query().Get("path")

		if requestedFile == "" {
			responseWithError(res, 400, "invalid param", fmt.Errorf("path must not be empty"))
			return
		}
		// ... maybe I should code a path filter here ...
		// you don't want a random app like this one to randomly access places
		// like System32, AppData, ... right?
		serveFile(res, req, requestedFile)
	})

	serveStatic(server, "/gallery", filepath.Join(app.GalleryFolderPath))
}
