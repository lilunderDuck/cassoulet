import { readdir, readdirSync, readFileSync, writeFileSync } from "node:fs"

const data = []

for (const dir of readdirSync("./build/bin/data/video_player/gallery/momokuri (manga)")) {
  data.push({ fileName: dir })
}

writeFileSync("a.json", JSON.stringify(data))