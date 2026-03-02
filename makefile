dev:
	wails dev -tags=TOAST_DEBUG

build:
	wails build -ldflags="-s -w -buildid=" -skipembedcreate -trimpath
build_debug:
	wails build -debug