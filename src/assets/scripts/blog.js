require('./socialShare.js')

import Barba from 'barba.js'
import React from 'react'
import ReactDOM from 'react-dom'
import BlogPostGrid from './components/blog/BlogPostGrid'

const gridItems = [
  {
    postUrl: '/blog/putting-amazon-textract-to-the-test',
    postCategory: 'Business',
    postHeading: 'Putting Amazon Textract to the test',
    postMins: 6,
    postText: 'Amazon Textract extracts text and structured data from scanned or photographed documents, but how reliably can it be used for business process automation? We put it to the test.'
  },
  {
    postUrl: '/blog/how-to-thrive-in-an-automated-business-world',
    postCategory: 'Design',
    postHeading: 'How to thrive in an automated business world',
    postMins: 3,
    postText: "How can your business thrive when you're constantly being disrupted by leaner, faster, more automated competition on a global scale?"
  },
  {
    postUrl: '/blog/automate-where-it-matters-with-process-maps',
    postCategory: 'Business',
    postHeading: 'Automate where it matters with process maps',
    postMins: 6,
    postText: "We've experienced how competing stakeholders, unclear ROIs, and uncertainty can make committing to business automation difficult. Process maps provide a powerful way to clear the fog."
  },
  {
    postUrl: '/blog/my-advice-as-a-junior-designer',
    postCategory: 'Design',
    postHeading: 'My advice as a junior designer',
    postMins: 4,
    postText: 'Over the past couple of months, I’ve had the privilege of working remotely at Leaf, helping them design and build digital products.'
  },
  {
    postUrl: '/blog/goals-matter',
    postCategory: 'Business',
    postHeading: 'Goals matter',
    postMins: 5,
    postText: "Without a clear definition of success, it's hard to know which direction to take, or whether you're making any progress. Goals provide direction and clarity for your teams."
  },
  {
    postUrl: '/blog/the-power-of-small-development-phases',
    postCategory: 'Business',
    postHeading: 'The power of small development phases',
    postMins: 5,
    postText: 'Imagine this scenario — someone in your company proposes a new software feature with the potential to save the business …'
  },
  {
    postUrl: '/blog/a-home-office-for-productivity',
    postCategory: 'Productivity',
    postHeading: 'A home office for productivity',
    postMins: 3,
    postText: 'At Leaf, we embrace remote work to get a productive edge. However, it’s easy for a remote environment to work against you.'
  },
  {
    postUrl: '/blog/behavioural-traps-in-software-teams',
    postCategory: 'Business',
    postHeading: 'Behavioural traps in software teams',
    postMins: 3,
    postText: 'In my experience of software teams, there are a few behavioural traps that leaders (senior stakeholders …'
  },
  {
    postUrl: '/blog/working-too-much-please-stop',
    postCategory: 'Productivity',
    postHeading: 'Working too much? Please stop',
    postMins: 4,
    postText: 'These days, people in most organisations are encouraged to work in their personal time …'
  },
  {
    postUrl: '/blog/leaf-is-two-years-old',
    postCategory: 'Agency life',
    postHeading: 'Leaf is two years old - A few words to celebrate',
    postMins: 4,
    postText: 'By the age of two, many toddlers will have gained significant new skills; from improvements in their ability to …'
  },
  {
    postUrl: '/blog/how-to-write-better-work-enquiries',
    postCategory: 'Business',
    postHeading: 'How to write better work enquiries',
    postMins: 3,
    postText: 'Five steps to start off on the right foot. As somebody with little-to-no experience of the web, the idea of enquiring …'
  },
  {
    postUrl: '/blog/5-tips-for-actually-shipping-a-side-project',
    postCategory: 'Productivity',
    postHeading: '5 tips for actually shipping a side project',
    postMins: 4,
    postText: 'We took Howdy, our own little app, from an idea to a fully published SaaS application entirely in our spare time. During its development…'
  },
  {
    postUrl: '/blog/your-users-are-humans-too',
    postCategory: 'Design',
    postHeading: 'Your users are humans too',
    postMins: 2,
    postText: 'You’ve been charged with redesigning the company website, and you’re stoked. You’ve met with stakeholders, created a tonne of user…'
  },
  {
    postUrl: '/blog/there-are-no-excuses-for-poor-engineering-in-2017',
    postCategory: 'Development',
    postHeading: 'There are no excuses for poor engineering in 2017',
    postMins: 3,
    postText: 'Writing great code is easier than ever, and yet we act like it doesn’t matter'
  },
  {
    postUrl: '/blog/for-the-love-of-winning-work',
    postCategory: 'Business',
    postHeading: 'For the love of winning work',
    postMins: 5,
    postText: 'My wife recently turned to me during an episode of First Dates and remarked how lucky we were that we’d, “never have to do that again”. She…'
  },
  {
    postUrl: '/blog/burnout-in-tech-and-why-you-could-be-part-of-the-problem',
    postCategory: 'Productivity',
    postHeading: 'Burnout in tech, and why you could be part of the problem',
    postMins: 2,
    postText: 'We all feel overwhelmed from time to time, and in a psychologically exhausting World of 24-hour iOS notifications and 15-man group chats…'
  },
  {
    postUrl: '/blog/the-importance-of-designing-with-empathy',
    postCategory: 'Design',
    postHeading: 'The importance of designing with empathy',
    postMins: 2,
    postText: 'Humans are hardwired to act emphatically, and yet it’s a skill we’re rapidly losing'
  }
]

const getRandomGridItems = function (arr, n) {
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

const mountBlogComponents = function () {
  const indexMountPoint = document.querySelector('.grid--blog-index')
  if (indexMountPoint) {
    return ReactDOM.render(
      <BlogPostGrid gridItems={gridItems} />,
      indexMountPoint
    )
  }

  const postMountPoint = document.querySelector('.grid--blog-post')
  if (postMountPoint) {
    const randomGridItems = getRandomGridItems(gridItems, 3)
    return ReactDOM.render(
      <BlogPostGrid gridItems={randomGridItems} allSmall={true} />,
      postMountPoint
    )
  }

  const previewMountPoint = document.querySelector('.grid--blog-preview')
  if (previewMountPoint) {
    const firstGridItems = gridItems.slice(0, 3)
    return ReactDOM.render(
      <BlogPostGrid gridItems={firstGridItems} allSmall={true} />,
      previewMountPoint
    )
  }
}

document.addEventListener('DOMContentLoaded', mountBlogComponents)
Barba.Dispatcher.on('transitionCompleted', mountBlogComponents)
