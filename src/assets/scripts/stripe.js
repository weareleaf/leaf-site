const addPaymentButtonListeners = function() {
  const liveSite = location.host === 'weareleaf.com'
  const stripeKey = liveSite ? 'pk_live_COqrme9FBvt1ssbwvxEomd2I' : 'pk_test_6MCiAEXja5maiISN7W3cXjhP'
  const stripe = Stripe(stripeKey)
  const productPrices = {
    'analysis': liveSite ? 'price_1I8p39C2yPQt7QIdJCmWYM6j' : 'price_1I8pChC2yPQt7QIdSvx88QFs'
  }
  const paymentButtons = document.querySelectorAll('button[purchase-product]')
  for (let i = 0; i < paymentButtons.length; i++) {
    let button = paymentButtons[i]
    button.addEventListener('click', function () {
      this.classList.add("loading")
      const product = this.getAttribute("purchase-product")
      const productUrl = window.location.origin + "/" + product
      const successUrl = productUrl + "/purchase-complete"
      const errorUrl = productUrl + "/purchase-failed"
      stripe.redirectToCheckout({
        lineItems: [{
          price: productPrices[product],
          quantity: 1
        }],
        mode: 'payment',
        successUrl: successUrl,
        cancelUrl: productUrl,
      })
      .then(function (result) {
        if (result.error) {
          window.location = errorUrl
        }
      })
      .catch(function () {
        window.location = errorUrl
      })
    })
  }
}

window.addEventListener('load', addPaymentButtonListeners)