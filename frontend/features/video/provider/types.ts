type VideoStatusDef<T extends string | number, U extends object = {}> = { type: T } & U
export type VideoErrorStatus = VideoStatusDef<"error", { code: string, detail: string }>
export type VideoStatus =
  VideoStatusDef<"loading"> |
  VideoErrorStatus |
  VideoStatusDef<"loaded">
// 

export type VideoState = "paused" | "playing" | "finished"