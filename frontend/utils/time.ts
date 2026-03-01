export function secondsToHHMMSS(seconds: number) {
  try {
    return new Date(1000 * seconds).toISOString().substr(11, 8)
  } catch(error) {
    console.warn(error)
    return "00:00:00"
  }
}