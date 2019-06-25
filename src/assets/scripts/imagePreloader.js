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

if (!isMobileDevice()) {
  window.addEventListener(
    'load',
    setTimeout(function() {
      console.log('Preloading images...')
      preload('/assets/images/what-we-do.png')
      preload('/assets/images/company.png')
    }, 1000)
  )
}
