function isMobileDevice() {
  var agent = navigator.userAgent
  return agent.match(/Android/i) || agent.match(/webOS/i) || agent.match(/iPhone/i) || agent.match(/iPad/i) || agent.match(/iPod/i) || agent.match(/BlackBerry/i) || agent.match(/Windows Phone/i)
}

function canUseWebP() {
  var elem = document.createElement('canvas')
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }
  return false
}

function preload(src) {
  var i = new Image()
  i.src = src
}

if (!isMobileDevice()) {
  window.addEventListener('load', function() {
    var ext = canUseWebP() ? 'webp' : 'png'
    console.log('Preloading images...')
    preload('/assets/images/what-we-do.' + ext)
    preload('/assets/images/company.' + ext)
    preload('/assets/images/home.' + ext)
    preload('/assets/images/ebooks.' + ext)
    preload('/assets/images/jobs.' + ext)
    preload('/assets/images/our-work.' + ext)
    preload('/assets/images/project-planner.' + ext)
    preload('/assets/images/resources.' + ext)
    preload('/assets/images/terms.' + ext)
  })
}
