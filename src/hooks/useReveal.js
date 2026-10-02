import { useEffect } from 'react'
import { loadAnimations } from '../utils/animations'

export function useReveal(ref, dependency = '', hero = false) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let disposed = false
    let context
    loadAnimations().then((gsap) => {
      if (disposed || !ref.current) return
      context = gsap.context(() => {
        const media = gsap.matchMedia()
        media.add('(prefers-reduced-motion: no-preference)', () => {
          const elements = gsap.utils.toArray('[data-reveal]')
          if (hero) {
            gsap.fromTo(elements, { y: 24, opacity: 0 }, {
              y: 0, opacity: 1, stagger: 0.08, duration: 0.8,
              ease: 'power3.out', clearProps: 'transform,opacity'
            })
          } else {
            elements.forEach((element, index) => {
              gsap.fromTo(element, { y: 24, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
                delay: element.matches('.skill-card, .project-card') ? (index % 3) * 0.06 : 0,
                clearProps: 'transform,opacity',
                scrollTrigger: { trigger: element, start: 'top 94%', once: true }
              })
            })
          }
          const portrait = ref.current.querySelector('[data-float]')
          if (portrait) {
            gsap.to(portrait, {
              y: -9, rotation: 0.35, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
              scrollTrigger: {
                trigger: portrait, start: 'top bottom', end: 'bottom top',
                toggleActions: 'play pause resume pause'
              }
            })
          }
          const parallax = ref.current.querySelector('[data-parallax]')
          if (parallax && window.matchMedia('(min-width: 1024px)').matches) {
            gsap.to(parallax, {
              y: -22, ease: 'none',
              scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
            })
          }
        })
      }, ref)
    }).catch(() => { /* Content stays readable if animations cannot load. */ })
    return () => { disposed = true; context?.revert() }
  }, [ref, dependency, hero])
}
