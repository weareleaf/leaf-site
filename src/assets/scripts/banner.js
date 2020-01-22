export default function () {
  const bannerButton = document.querySelector('.banner__close')
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
}
