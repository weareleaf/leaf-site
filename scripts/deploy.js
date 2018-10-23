let pages = require("gh-pages")

pages.publish(
  "../.publish",
  {
    remote: 'upstream'
  },
  () => {
    console.log("All done!")
  }
)
