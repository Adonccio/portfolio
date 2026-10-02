let animationLibrary
let navigationLibrary

export function loadAnimations() {
  animationLibrary ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    .then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return gsap
    })
  return animationLibrary
}

export function loadNavigationAnimations() {
  navigationLibrary ??= Promise.all([loadAnimations(), import('gsap/ScrollToPlugin')])
    .then(([gsap, { ScrollToPlugin }]) => {
      gsap.registerPlugin(ScrollToPlugin)
      return gsap
    })
  return navigationLibrary
}
