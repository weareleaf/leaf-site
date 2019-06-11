function isMobileDevice() {
  var agent = navigator.userAgent
  return agent.match(/Android/i) || agent.match(/webOS/i) || agent.match(/iPhone/i) || agent.match(/iPad/i) || agent.match(/iPod/i) || agent.match(/BlackBerry/i) || agent.match(/Windows Phone/i)
}

function preload(src) {
  var i = new Image()
  i.src = src
}

if (!isMobileDevice()) {
  window.addEventListener('load', function() {
    console.log('Preloading images...')
    preload('/assets/images/what-we-do.png')
    preload('/assets/images/company.png')
    preload('/assets/images/home.png')
    preload('/assets/images/ebooks.png')
    preload('/assets/images/jobs.png')
    preload('/assets/images/our-work.png')
    preload('/assets/images/project-planner.png')
    preload('/assets/images/resources.png')
    preload('/assets/images/terms.png')
  })
}
