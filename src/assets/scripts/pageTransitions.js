import Barba from 'barba.js'
import banner from './close.js'
import modal from './modal.js'

const body = document.body
const TRANSITION_TIME = 450

const PageTransition = Barba.BaseTransition.extend({
  initialiseBannerAndModal: function () {
    body.classList.remove('modal-open')
    banner()
    modal()
  },

  addTransitionOutClass: function (callback) {
    body.classList.remove('transition-in')
    body.classList.add('transition-out')

    if (callback) {
      setTimeout(callback, TRANSITION_TIME)
    }
  },

  addTransitionInClass: function (callback) {
    body.classList.remove('transition-out')
    body.classList.add('transition-in')

    if (callback) {
      setTimeout(callback, TRANSITION_TIME)
    }
  },

  start: function () {
    console.log('Page transition started')

    const promisedLoad = this.newContainerLoading

    this.addTransitionOutClass(() => {
      window.scrollTo(0, 0)
      promisedLoad.then(() => {
        this.done()
        this.initialiseBannerAndModal()
        this.addTransitionInClass()
        console.log('Page transition ended')
      })
    })
  },
})

window.addEventListener('load', function () {
  PageTransition.addTransitionInClass()
  PageTransition.initialiseBannerAndModal()
})

Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck
Barba.Pjax.preventCheck = function (evt, element) {
  if (!Barba.Pjax.originalPreventCheck(evt, element)) {
    return false
  }

  if (element.href.toLowerCase() === '#') {
    return false
  }

  return true
}
Barba.Pjax.getTransition = function () {
  return PageTransition
}
Barba.Pjax.start()
