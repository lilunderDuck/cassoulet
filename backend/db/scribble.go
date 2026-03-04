// Package scribble is a tiny JSON database
package db

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"video_player/backend/debug"
)

// Version is the current version of the project
const Version = "1.0.4"

type Driver struct {
	mutex   sync.Mutex
	mutexes map[string]*sync.Mutex
	dir     string // the directory where scribble will create the database
}

// Options uses for specification of working golang-scribble
type Options struct {
}

// New creates a new scribble database at the desired directory location, and
// returns a *Driver to then use for interacting with the database
func New(dir string, options *Options) (*Driver, error) {
	if debug.IS_ENABLED {
		debug.InfoLabel("db/cache", fmt.Sprintf("Opening database: %s", debug.FormatPath(dir)))
	}
	//
	dir = filepath.Clean(dir)

	//
	driver := Driver{
		dir:     dir,
		mutexes: make(map[string]*sync.Mutex),
	}

	// if the database already exists, just use it
	if _, err := os.Stat(dir); err == nil {
		if debug.IS_ENABLED {
			debug.InfoLabel("db/cache", fmt.Sprintf("Using '%s' (database already exists)\n", dir))
		}
		return &driver, nil
	}

	// if the database doesn't exist create it
	if debug.IS_ENABLED {
		debug.InfoLabel("db/cache", "No database existed, creating a new fresh one...\n")
	}
	return &driver, os.MkdirAll(dir, 0755)
}

// Write locks the database and attempts to write the record to the database under
// the [collection] specified with the [resource] name given
func (d *Driver) Write(collection, resource string, v interface{}) error {
	if debug.IS_ENABLED {
		debug.InfoLabel("db/cache", fmt.Sprintf(
			"Writing data to cache...\nCollection: %s\nResource: %s\nData: %#v",
			collection,
			resource,
			v,
		))
	}

	// ensure there is a place to save record
	if collection == "" {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", scribbleMissingCollection)
		}
		return scribbleMissingCollection
	}

	// ensure there is a resource (name) to save record as
	if resource == "" {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", scribbleMissingResource)
		}
		return scribbleMissingResource
	}

	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()
	defer mutex.Unlock()

	dir := filepath.Join(d.dir, collection)
	fnlPath := filepath.Join(dir, resource+".json")
	tmpPath := fnlPath + ".tmp"

	// create collection directory
	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	b, err := json.Marshal(v)
	if err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", err)
		}
		return err
	}

	// write marshaled data to the temp file
	if err := os.WriteFile(tmpPath, b, 0644); err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", err)
		}
		return err
	}

	// move final file into place
	return os.Rename(tmpPath, fnlPath)
}

// Read a record from the database
func (d *Driver) Read(collection, resource string, v interface{}) error {
	if debug.IS_ENABLED {
		debug.InfoLabel("db/cache", fmt.Sprintf(
			"Reading data from cache...\nCollection: %s\nResource: %s\nData: %#v",
			collection,
			resource,
			v,
		))
	}

	// ensure there is a place to save record
	if collection == "" {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", scribbleMissingCollection)
		}
		return scribbleMissingCollection
	}

	// ensure there is a resource (name) to save record as
	if resource == "" {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", scribbleMissingResource)
		}
		return scribbleMissingResource
	}

	record := filepath.Join(d.dir, collection, resource)

	// check to see if file exists
	if _, err := stat(record); err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", err)
		}
		return err
	}

	// read record from database
	b, err := os.ReadFile(record + ".json")
	if err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", err)
		}
		return err
	}

	// unmarshal data
	err = json.Unmarshal(b, &v)
	if debug.IS_ENABLED {
		if err != nil {
			debug.ErrLabel("db/cache", err)
		}
	}

	return err
}

// ReadAll records from a collection; this is returned as a slice of strings because
// there is no way of knowing what type the record is.
func (d *Driver) ReadAll(collection string) ([]string, error) {
	if debug.IS_ENABLED {
		debug.InfoLabel("db/cache", fmt.Sprintf(
			"Reading all data from cache...\nCollection: %s",
			collection,
		))
	}

	// ensure there is a collection to read
	if collection == "" {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", scribbleMissingCollection)
		}
		return nil, scribbleMissingCollection
	}

	//
	dir := filepath.Join(d.dir, collection)

	// check to see if collection (directory) exists
	if _, err := stat(dir); err != nil {
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", err)
		}
		return nil, err
	}

	// read all the files in the transaction.Collection; an error here just means
	// the collection is either empty or doesn't exist
	files, _ := os.ReadDir(dir)

	// the files read from the database
	var records []string

	// iterate over each of the files, attempting to read the file. If successful
	// append the files to the collection of read files
	for _, file := range files {
		b, err := os.ReadFile(filepath.Join(dir, file.Name()))
		if err != nil {
			if debug.IS_ENABLED {
				debug.ErrLabel("db/cache", err)
			}
			return nil, err
		}

		// append read file
		records = append(records, string(b))
	}

	// unmarhsal the read files as a comma delimeted byte array
	return records, nil
}

// Delete locks that database and then attempts to remove the collection/resource
// specified by [path]
func (d *Driver) Delete(collection, resource string) error {
	path := filepath.Join(collection, resource)
	//
	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()
	defer mutex.Unlock()

	//
	dir := filepath.Join(d.dir, path)

	switch fi, err := stat(dir); {

	// if fi is nil or error is not nil return
	case fi == nil, err != nil:
		if debug.IS_ENABLED {
			debug.ErrLabel("db/cache", err)
		}
		return fmt.Errorf("Unable to find file or directory named %v\n", path)

	// remove directory and all contents
	case fi.Mode().IsDir():
		return os.RemoveAll(dir)

	// remove file
	case fi.Mode().IsRegular():
		return os.RemoveAll(dir + ".json")
	}

	return nil
}

func stat(path string) (fi os.FileInfo, err error) {
	// check for dir, if path isn't a directory check to see if it's a file
	if fi, err = os.Stat(path); os.IsNotExist(err) {
		fi, err = os.Stat(path + ".json")
	}

	if debug.IS_ENABLED {
		if err != nil {
			debug.ErrLabel("db/cache", err)
		}
	}

	return
}

// getOrCreateMutex creates a new collection specific mutex any time a collection
// is being modfied to avoid unsafe operations
func (d *Driver) getOrCreateMutex(collection string) *sync.Mutex {
	d.mutex.Lock()
	defer d.mutex.Unlock()

	m, ok := d.mutexes[collection]

	// if the mutex doesn't exist make it
	if !ok {
		m = &sync.Mutex{}
		d.mutexes[collection] = m
	}

	return m
}
