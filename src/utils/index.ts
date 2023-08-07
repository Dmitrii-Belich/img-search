export const throttle = <R, A extends any[]>(
  fn: (...args: A) => R,
  delay: number
): (...args: A) => R | undefined => {
  let wait = false

  return (...args: A) => {
    if (wait) return undefined
    wait = true

    window.setTimeout(() => {
      wait = false
    }, delay)

    return fn(...args)
  }
}

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: number | null = null
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID || 0)
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay)
  } as F
}
