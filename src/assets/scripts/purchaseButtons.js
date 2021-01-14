import { stripe, productPrices} from './config.js'

export default function () {
  const paymentButtons = document.querySelectorAll('button[purchase-product]')
  for (let i = 0; i < paymentButtons.length; i++) {
    let button = paymentButtons[i]
    const product = button.getAttribute("purchase-product")
    const productPrice = productPrices()[product]
    if (!productPrice) continue
    button.addEventListener('click', function () {
      this.classList.add("loading")
      const productUrl = window.location.origin + "/" + product
      const successUrl = productUrl + "/purchase-complete"
      const errorUrl = productUrl + "/purchase-failed"
      stripe.redirectToCheckout({
        lineItems: [{
          price: productPrice,
          quantity: 1
        }],
        mode: 'payment',
        successUrl: successUrl,
        cancelUrl: window.location.href,
      })
      .then(function (result) {
        if (result.error) {
          window.location = errorUrl
        }
      })
      .catch(function (error) {
        window.location = errorUrl
      })
    })
  }
}