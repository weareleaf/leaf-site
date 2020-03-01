require('./socialShare.js')

import Barba from 'barba.js'
import React from 'react'
import ReactDOM from 'react-dom'
import BlogPostGrid from './components/blog/BlogPostGrid'

const posts = require('./blog-posts.js')

const getRandomGridItems = function(arr, n) {
  const result = new Array(n)
  let len = arr.length
  const taken = new Array(len)

  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }

  return result
}

const mountBlogComponents = function() {
  const indexMountPoint = document.querySelector('.grid--blog-index')
  const gridItems = posts.filter(p => p.postPublished)
  if (indexMountPoint) {
    return ReactDOM.render(
      <BlogPostGrid gridItems={gridItems} />,
      indexMountPoint
    )
  }

  const postMountPoint = document.querySelector('.grid--blog-preview')

  if (postMountPoint) {
    let renderableGridItems = null

    if (!!window.location.href.match(/\/blog\//)) {
      renderableGridItems = getRandomGridItems(gridItems, 3)
    } else {
      renderableGridItems = gridItems.slice(0, 3)
    }

    return ReactDOM.render(
      <BlogPostGrid gridItems={renderableGridItems} allSmall={true} />,
      postMountPoint
    )
  }
}

document.addEventListener('DOMContentLoaded', mountBlogComponents)
Barba.Dispatcher.on('transitionCompleted', mountBlogComponents)
