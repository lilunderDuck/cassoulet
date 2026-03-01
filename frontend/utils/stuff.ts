export function getFilenameFromUrl(url: string) {
  return url.split("/").pop()!
}

export function trimFileExtension(fileName: string) {
  return fileName.split('.').slice(0, -1).join('.')
}

export function wrapFn<T extends (...something: any[]) => any>(fn: T, sideEffect: (value: ReturnType<T>) => any): T {
  return ((...something) => {
    const returnValue = fn(...something)
    sideEffect(returnValue)
    return returnValue
  }) as T
}