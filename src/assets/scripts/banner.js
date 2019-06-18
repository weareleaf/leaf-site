function onClick() {
  const { pathname, origin } = window.location

  if (pathname.match(/blog/)) {
    window.location = `${origin}/blog`
  } else {
    window.location = `${origin}/our-work`
  }
}

export default function () {
  const bannerButton = document.querySelector('.banner__button')
  const bannerLogo = document.querySelector('.banner__logo')
  const bannerImage = document.querySelector('.banner__image')

  if (bannerButton) {
    const { pathname, origin } = window.location
    if (pathname.match(/blog/)) {
      bannerButton.href = '/blog'
    } else {
      bannerButton.href = '/our-work'
    }
  }

  if (bannerLogo) {
    const fadeInOffset = bannerImage.offsetHeight
    let visible = false

    window.addEventListener('scroll', (e) => {
      const offset = document.body.scrollTop

      if (offset >= fadeInOffset && !visible) {
        bannerLogo.classList.add('banner__logo--visible')
        visible = true
      } else if (offset < fadeInOffset && visible) {
        bannerLogo.classList.remove('banner__logo--visible')
        visible = false
      }
    })
  }

}
