import { useEffect, useState } from 'react'

export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const update = () => {
      const anchor = Math.min(window.innerHeight * 0.35, 260)
      let current = ''
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= anchor) current = id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = ids.at(-1)
      }
      setActive(current)
    }
    let frame = 0
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => { update(); frame = 0 })
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])
  return active
}
