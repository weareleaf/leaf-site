function onClick() {
  const { pathname, origin } = window.location

  if (pathname.match(/blog/)) {
    window.location = `${origin}/blog`
  } else if (pathname.match(/careers/)) {
    window.location = `${origin}/careers`
  } else {
    window.location = `${origin}/case-studies`
  }
}

export default function () {
  const bannerButton = document.querySelector('.banner__close')
  const bannerLogo = document.querySelector('.banner__logo')
  const bannerImage = document.querySelector('.banner__media')

  if (bannerButton) {
    const { pathname, origin } = window.location
    if (pathname.match(/blog/)) {
      bannerButton.href = '/blog'
    } else if (pathname.match(/careers/)) {
      bannerButton.href = '/careers'
    } else {
      bannerButton.href = '/case-studies'
    }
  }

  if (bannerLogo && bannerImage) {
    const fadeInOffset = bannerImage.offsetHeight
    let visible = false

    window.addEventListener('scroll', (e) => {
      const offset = window.scrollY

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
