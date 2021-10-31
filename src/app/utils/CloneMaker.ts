export function clone(source: any): any {
  return JSON.parse(JSON.stringify(source))
}
