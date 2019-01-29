import Barba from "barba.js"
import banner from "../../components/banner/banner.js"
import modal from "../../components/modal/modal.js"

const transitioner = document.getElementById('transitioner')
const TRANSITION_TIME = 334
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

  active: function() {
    transitioner.classList.add('active')
  },

  inactive: function() {
    transitioner.classList.remove('active')
  },

  opaque: function() {
    transitioner.classList.add('opaque')
  },

  transparent: function() {
    transitioner.classList.remove('opaque')
  },

  start: function() {
    console.log('Starting transition')
    this.active()
    const promisedLoad = this.newContainerLoading
    this.opaque()
    setTimeout(() => {
      promisedLoad.then(() => this.finish())
    }, TRANSITION_TIME)
  },

  finish: function() {
    document.body.scrollTop = 0
    this.transparent()
    this.done()
    banner()
    modal()
    this.reloadHowdy()
    setTimeout(() => {
      this.inactive()
      console.log('Ended transition')
    }, TRANSITION_TIME)
  }
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
