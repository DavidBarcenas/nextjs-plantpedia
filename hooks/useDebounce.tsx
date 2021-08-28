import { useEffect, useState } from "react"

export const useDebounce = (value: string, time = 0) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const debounce = window.setTimeout(() => {
      setDebounceValue(value)
    }, time)

    return () => window.clearTimeout(debounce)
  }, [value])

  return debounceValue
}