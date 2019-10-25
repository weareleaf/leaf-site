import Barba from 'barba.js'
import banner from './banner.js'
import modal from './modal.js'
import { createBlob } from './blob.js'

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

  startBlob: function() {
    const blob = document.querySelector('.hero__blob-path')

    if (!blob) {
      return
    }

    createBlob({
      element: blob,
      numPoints: 30,
      centerX: 500,
      centerY: 500,
      minRadius: 460,
      maxRadius: 500,
      minDuration: 5,
      maxDuration: 8
    })
  },

  trackVirtualPageView: function() {
    const path = window.location.pathname
    if (window.gtag) {
      gtag('config', 'UA-62036216-1', {page_path: path})
      console.log('Tracked virtual page view "' + path + '"')
    } else {
      console.log('Could not track page view "' + path + '"')
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
      window.scrollTo(0, 0)
      promisedLoad.then(() => this.finish())
    }, TRANSITION_TIME)
  },

  finish: function() {
    this.done()
    body.classList.remove('modal-open')
    banner()
    modal()
    this.reloadHowdy()
    this.startBlob()
    this.in()
    this.trackVirtualPageView()
    console.log('Ended transition')
  }
})

window.addEventListener('load', function() {
  PageTransition.in()
  PageTransition.startBlob()
  banner()
  modal()
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
