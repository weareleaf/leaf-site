const addPaymentButtonListeners = function() {
  const liveSite = location.host === 'weareleaf.com'
  const stripeKey = liveSite ? 'pk_live_COqrme9FBvt1ssbwvxEomd2I' : 'pk_test_6MCiAEXja5maiISN7W3cXjhP'
  const stripe = Stripe(stripeKey)
  const productPrices = {
    'analysis': liveSite ? 'price_1I8p39C2yPQt7QIdJCmWYM6j' : 'price_1I8pChC2yPQt7QIdSvx88QFs'
  }
  const paymentButtons = document.querySelectorAll('button[product][success][cancel]')
  for (let i = 0; i < paymentButtons.length; i++) {
    let button = paymentButtons[i]
    button.addEventListener('click', function () {
      const product = this.getAttribute("product")
      const success = this.getAttribute("success")
      const cancel = this.getAttribute("cancel")
      stripe.redirectToCheckout({
        lineItems: [{
          price: productPrices[product],
          quantity: 1
        }],
        mode: 'payment',
        successUrl: window.location.origin + success,
        cancelUrl: window.location.origin + cancel,
      })
      .then(function (result) {
        if (result.error) {
          console.error(result.error.message)
        }
      })
    })
  }
}

window.addEventListener('load', addPaymentButtonListeners)