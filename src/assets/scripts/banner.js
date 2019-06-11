function onClick() {
  const { pathname, origin } = window.location

  if (pathname.match(/blog/)) {
    window.location = `${origin}/blog`
  } else {
    window.location = `${origin}/our-work`
  }
}

export default function () {
  const bannerButton = document.querySelector(".banner__button");

  if (bannerButton) {
    const { pathname, origin } = window.location
    if (pathname.match(/blog/)) {
      bannerButton.href = '/blog'
    } else {
      bannerButton.href = '/our-work'
    }
  }
}
