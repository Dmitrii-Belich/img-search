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
