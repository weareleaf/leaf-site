import Barba from "barba.js"
import banner from "../../components/banner/banner.js"
import modal from "../../components/modal/modal.js"

const TRANSITION_TIME = 800
const PageTransition = Barba.BaseTransition.extend({
  // This is pretty awful. Howdy has no way to manually trigger a
  // reload so we need to remove & re-add the script to the page
  reloadHowdy: function() {
    if (!!document.querySelector('form')) {
      const howdy = document.getElementById('howdy-script')
      const head = howdy.parentNode
      head.removeChild(howdy)

      const newHowdy = document.createElement('script')
      newHowdy.setAttribute('id', howdy.id)
      newHowdy.setAttribute('src', howdy.src)
      head.appendChild(newHowdy)
    }
  },

  out: function() {
    const headerAddress = document.querySelector('.header__address')
    headerAddress.classList.remove('transition-in')
    headerAddress.classList.add('transition-out')

    const headerSocial = document.querySelector('.header__social')
    headerSocial.classList.remove('transition-in')
    headerSocial.classList.add('transition-out')

    const heroContent = document.querySelector('.hero__content')
    heroContent.classList.remove('transition-in')
    heroContent.classList.add('transition-out')

    const heroImage = document.querySelector('.hero__image img')
    heroImage.classList.remove('transition-in')
    heroImage.classList.add('transition-out')

    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => {
      section.classList.remove('transition-in')
      section.classList.add('transition-out')
    })
  },

  in: function() {
    const headerAddress = document.querySelector('.header__address')
    headerAddress.classList.add('transition-in')
    headerAddress.classList.remove('transition-out')

    const headerSocial = document.querySelector('.header__social')
    headerSocial.classList.add('transition-in')
    headerSocial.classList.remove('transition-out')

    const heroContent = document.querySelector('.hero__content')
    heroContent.classList.add('transition-in')
    heroContent.classList.remove('transition-out')

    const heroImage = document.querySelector('.hero__image img')
    heroImage.classList.add('transition-in')
    heroImage.classList.remove('transition-out')

    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => {
      section.classList.add('transition-in')
      section.classList.remove('transition-out')
    })
  },

  start: function() {
    console.log('Starting transition')
    this.out()
    const promisedLoad = this.newContainerLoading
    setTimeout(() => {
      promisedLoad.then(() => this.finish())
    }, TRANSITION_TIME)
  },

  finish: function() {
    document.body.scrollTop = 0
    this.done()
    banner()
    modal()
    this.reloadHowdy()
    this.in()
    console.log('Ended transition')
  }
})

window.addEventListener('load', function() {
  PageTransition.in()
})


Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck
Barba.Pjax.preventCheck = function(evt, element) {
  if (!Barba.Pjax.originalPreventCheck(evt, element)) {
    return false
  }

  if (element.href.toLowerCase() === '#') {
    return false
  }

  return true
}
Barba.Pjax.getTransition = function() {
  return PageTransition
}
Barba.Pjax.start()
