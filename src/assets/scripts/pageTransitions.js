import Barba from 'barba.js'
import banner from './banner.js'
import modal from './modal.js'

const body = document.body
const TRANSITION_TIME = 500

const PageTransition = Barba.BaseTransition.extend({
  // This is an awful hack. Howdy has no way to manually trigger a
  // reload so we need to remove & re-add the script to the page
  // when we transition to a new page.
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

  trackVirtualPageView: function() {
    const path = window.location.pathname
    if (window.gtag) {
      gtag('config', 'UA-62036216-1', { page_path: path })
      console.log('Tracked virtual page view "' + path + '"')
    } else {
      console.log('Could not track page view "' + path + '"')
    }
  },

  initialiseBannerAndModal: function() {
    body.classList.remove('modal-open')
    banner()
    modal()
  },

  addTransitionOutClass: function(callback) {
    body.classList.remove('transition-in')
    body.classList.add('transition-out')

    if (callback) {
      setTimeout(callback, TRANSITION_TIME)
    }
  },

  addTransitionInClass: function(callback) {
    body.classList.remove('transition-out')
    body.classList.add('transition-in')

    if (callback) {
      setTimeout(callback, TRANSITION_TIME)
    }
  },

  start: function() {
    console.log('Starting transition')

    const promisedLoad = this.newContainerLoading

    this.addTransitionOutClass(() => {
      window.scrollTo(0, 0)

      promisedLoad.then(() => {
        this.done()
        this.initialiseBannerAndModal()
        this.addTransitionInClass()
        this.trackVirtualPageView()
        this.reloadHowdy()
        console.log('Ended transition')
      })
    })
  }
})

window.addEventListener('load', function() {
  PageTransition.addTransitionInClass()
  PageTransition.initialiseBannerAndModal()
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
