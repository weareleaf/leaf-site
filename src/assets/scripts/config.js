export const isProduction = () => {
  return location.host === 'weareleaf.com'
}

export const stripeKey = () => {
  return isProduction() ? 'pk_live_COqrme9FBvt1ssbwvxEomd2I' : 'pk_test_6MCiAEXja5maiISN7W3cXjhP'
}

export const stripe = Stripe(stripeKey())

export const productPrices = () => {
  const liveSite = isProduction()
  return {
    'analysis': liveSite ? 'price_1I8p39C2yPQt7QIdJCmWYM6j' : 'price_1I8pChC2yPQt7QIdSvx88QFs'
  }
}