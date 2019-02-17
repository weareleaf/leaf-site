import Barba from "barba.js"
import banner from "../../components/banner/banner.js"
import modal from "../../components/modal/modal.js"

const body = document.body
const TRANSITION_TIME = 500
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
    body.classList.add('transition-out')
  },

  reset: function() {
    body.classList.remove('transition-in')
    body.classList.remove('transition-out')
  },

  in: function() {
    body.classList.add('transition-in')
  },

  start: function() {
    console.log('Starting transition')
    this.reset()
    this.out()
    const promisedLoad = this.newContainerLoading
    setTimeout(() => {
      this.reset()
      promisedLoad.then(() => this.finish())
    }, TRANSITION_TIME)
  },

  finish: function() {
    this.done()
    banner()
    modal()
    body.classList.remove("modal-open")
    this.reloadHowdy()
    body.scrollTop = 0
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
