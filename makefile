dev:
	wails dev -tags=TOAST_DEBUG -skipembedcreate

build:
	wails build -ldflags="-s -w -buildid=" -skipembedcreate -trimpath
build_debug:
	wails build -debug