export default function () {
  const headerButton = document.querySelector('.header__close__link')
  if (headerButton) {
    const { pathname, origin } = window.location
    if (pathname.match(/blog/)) {
      headerButton.href = '/blog'
    } else if (pathname.match(/careers/)) {
      headerButton.href = '/careers'
    } else {
      headerButton.href = '/case-studies'
    }
  }
}
