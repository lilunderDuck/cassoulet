package server

import (
	"fmt"
	"net/http"
	"video_player/backend/debug"
)

func StartServer() {
	server := http.NewServeMux()

	createAssetsRoute(server)
	if debug.IS_ENABLED {
		server.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			debug.InfoLabel("server", fmt.Sprintf("hello %s", debug.FormatPath(r.URL.Path)))
		})

		debug.InfoLabel("server", "server starts at port :30000")
	}

	http.ListenAndServe(":30000", server)
}
