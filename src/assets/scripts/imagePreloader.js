function isLandingPage() {
  return window.location.pathname === '/bespoke-business-automation'
}

function isMobileDevice() {
  var agent = navigator.userAgent
  return (
    agent.match(/Android/i) ||
    agent.match(/webOS/i) ||
    agent.match(/iPhone/i) ||
    agent.match(/iPad/i) ||
    agent.match(/iPod/i) ||
    agent.match(/BlackBerry/i) ||
    agent.match(/Windows Phone/i)
  )
}

function preload(src) {
  var i = new Image()
  i.src = src
}

if (!isMobileDevice() && !isLandingPage()) {
  window.addEventListener('load', function() {
    window.pageLoaded = true
    console.log('Preloading images...')
    preload('/assets/images/heros/home.gif')
    preload('/assets/images/heros/what-we-do.gif')
    preload('/assets/images/heros/company.gif')
  })
}
