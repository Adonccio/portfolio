import { useEffect } from 'react'
import { loadNavigationAnimations } from '../utils/animations'

export function useSectionNavigation() {
  useEffect(() => {
    let disposed = false
    let sequence = 0
    let scrollTween
    let entryTween
    let restoreScrollBehavior
    const root = document.documentElement

    const stop = () => {
      sequence += 1
      scrollTween?.kill()
      entryTween?.revert()
      entryTween = null
      restoreScrollBehavior?.()
      restoreScrollBehavior = null
      delete root.dataset.navigating
    }

    const focusSection = (target) => {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }

    const onClick = async (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const hash = link.getAttribute('href')
      const target = document.getElementById(hash.slice(1))
      if (!target || link.hasAttribute('download')) return
      event.preventDefault()
      stop()
      const request = sequence
      if (location.hash !== hash) history.pushState(null, '', hash)

      const nativeScroll = () => {
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        focusSection(target)
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { nativeScroll(); return }

      try {
        const gsap = await loadNavigationAnimations()
        if (disposed || request !== sequence) return
        const previousBehavior = root.style.scrollBehavior
        root.style.scrollBehavior = 'auto'
        restoreScrollBehavior = () => { root.style.scrollBehavior = previousBehavior }
        root.dataset.navigating = 'true'
        const offset = (document.querySelector('.site-header')?.getBoundingClientRect().height || 80) + 24
        const distance = Math.abs(target.getBoundingClientRect().top - offset)
        scrollTween = gsap.to(window, {
          scrollTo: { y: target, offsetY: offset, autoKill: true, onAutoKill: stop },
          duration: Math.min(1, 0.45 + distance / 7000), ease: 'power2.inOut',
          onComplete: () => {
            if (request !== sequence) return
            restoreScrollBehavior?.()
            restoreScrollBehavior = null
            delete root.dataset.navigating
            focusSection(target)
            const heading = target.querySelector('.section-heading h2, #hero-title, #contact-title')
            if (heading) {
              entryTween = gsap.fromTo(heading, { y: 14, opacity: 0.65 }, {
                y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity'
              })
            }
          }
        })
      } catch {
        if (!disposed && request === sequence) { stop(); nativeScroll() }
      }
    }
    const onKeyDown = (event) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Escape'].includes(event.key)) stop()
    }
    const onMotionChange = (event) => { if (event.matches) stop() }
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    document.addEventListener('click', onClick)
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', stop)
    motion.addEventListener('change', onMotionChange)
    return () => {
      disposed = true
      stop()
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', stop)
      motion.removeEventListener('change', onMotionChange)
    }
  }, [])
}
