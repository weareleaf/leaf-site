import Barba from 'barba.js'

const openShareWindow = function(url) {
  window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=450,width=600')
}

const shareTwitter = function(url, title) {
  openShareWindow(`https://twitter.com/intent/tweet?url=${url}&text=${title}`)
}

const shareFacebook = function(url) {
  openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
}

const shareLinkedIn = function(url) {
  openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
}

const addShareLinkListeners = function() {
  document.querySelectorAll('.share__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      const { socialNetwork } = link.dataset
      const currentUrl = encodeURI(window.location.href)
      const title = encodeURI(document.title)

      if (socialNetwork === 'twitter') {
        shareTwitter(currentUrl, title)
      } else if (socialNetwork === 'facebook') {
        shareFacebook(currentUrl, title)
      } else if (socialNetwork === 'linkedin') {
        shareLinkedIn(currentUrl)
      }

      return false
    })
  })
}

window.addEventListener('load', addShareLinkListeners)
Barba.Dispatcher.on('transitionCompleted', addShareLinkListeners)
