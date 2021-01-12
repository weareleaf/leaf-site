export default function () {
  const headerButton = document.querySelector('.header__close__link')
  if (headerButton) {
    const { pathname, origin } = window.location
    if (pathname.match(/blog/)) {
      headerButton.href = '/blog'
    } else if (pathname.match(/careers/)) {
      headerButton.href = '/careers'
    }  else if (pathname.match(/purchase-complete/)) {
      headerButton.href = pathname.split("/purchase-complete")[0]
    }  else if (pathname.match(/purchase/)) {
      headerButton.href = pathname.split("/purchase")[0]
    } else {
      headerButton.href = '/case-studies'
    }
  }
}
