require('./socialShare.js')

import Barba from 'barba.js'
import React from 'react'
import ReactDOM from 'react-dom'
import BlogPostGrid from './components/blog/BlogPostGrid'

const gridItems = [
  {
    author: {
      authorName: 'Curtis Lee',
      authorDetails: '19 June 2019 · 4 min read',
      authorThumbnail: {
        src: '/assets/images/curt_blog.jpg',
        fallbackSrc: '/assets/images/curt_blog.jpg',
        alt: 'Curt'
      }
    },
    postUrl: '/blog/my-advice-as-a-junior-designer',
    postImage: {
      src: '/assets/images/blog/thumbnails/my-advice-curt.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/my-advice-curt.jpg',
      alt: 'My advice as a junior designer'
    },
    postHeading: 'My advice as a junior designer',
    postText:
      'Over the past couple of months, I’ve had the privilege of working remotely at Leaf, helping them design and build digital products.'
  },
  {
    author: {
      authorName: 'Mike Carter',
      authorDetails: '18 June 2019 · 5 min read',
      authorThumbnail: {
        src: '/assets/images/mike_blog.jpg',
        fallbackSrc: '/assets/images/mike_blog.jpg',
        alt: 'Mike'
      }
    },
    postUrl: '/blog/goals-matter',
    postImage: {
      src: '/assets/images/blog/thumbnails/goal.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/goal.jpg',
      alt: 'Goals matter'
    },
    postHeading: 'Goals matter',
    postText:
      "Without a clear definition of success, it's hard to know which direction to take, or whether you're making any progress. Goals provide direction and clarity for your teams."
  },
  {
    author: {
      authorName: 'Mike Carter',
      authorDetails: '17 Dec 2018 · 3 min read',
      authorThumbnail: {
        src: '/assets/images/mike_blog.jpg',
        fallbackSrc: '/assets/images/mike_blog.jpg',
        alt: 'Mike'
      }
    },
    postUrl: '/blog/the-power-of-small-development-phases',
    postImage: {
      src: '/assets/images/blog/thumbnails/small-development.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/small-development.jpg',
      alt: 'The power of small development phases'
    },
    postHeading: 'The power of small development phases',
    postText:
      'Imagine this scenario — someone in your company proposes a new software feature with the potential to save the business …'
  },
  {
    author: {
      authorName: 'Mike Carter',
      authorDetails: '2 Aug 2018 · 3 min read',
      authorThumbnail: {
        src: '/assets/images/mike_blog.jpg',
        fallbackSrc: '/assets/images/mike_blog.jpg',
        alt: 'Mike'
      }
    },
    postUrl: '/blog/a-home-office-for-productivity',
    postImage: {
      src: '/assets/images/blog/thumbnails/home-office.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/home-office.jpg',
      alt: 'A home office for productivity'
    },
    postHeading: 'A home office for productivity',
    postText:
      'At Leaf, we embrace remote work to get a productive edge. However, it’s easy for a remote environment to work against you.'
  },
  {
    author: {
      authorName: 'Mike Carter',
      authorDetails: '21 May 2018 · 3 min read',
      authorThumbnail: {
        src: '/assets/images/mike_blog.jpg',
        fallbackSrc: '/assets/images/mike_blog.jpg',
        alt: 'Mike'
      }
    },
    postUrl: '/blog/behavioural-traps-in-software-teams',
    postImage: {
      src: '/assets/images/blog/thumbnails/behavioural-traps.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/behavioural-traps.jpg',
      alt: 'Behavioural traps in software teams'
    },
    postHeading: 'Behavioural traps in software teams',
    postText:
      'In my experience of software teams, there are a few behavioural traps that leaders (senior stakeholders …'
  },
  {
    author: {
      authorName: 'Mike Carter',
      authorDetails: '20 Nov 2017 · 4 min read',
      authorThumbnail: {
        src: '/assets/images/mike_blog.jpg',
        fallbackSrc: '/assets/images/mike_blog.jpg',
        alt: 'Mike'
      }
    },
    postUrl: '/blog/working-too-much-please-stop',
    postImage: {
      src: '/assets/images/blog/thumbnails/work-too-much.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/work-too-much.jpg',
      alt: 'Working too much? Please stop'
    },
    postHeading: 'Working too much? Please stop',
    postText:
      'These days, people in most organisations are encouraged to work in their personal time …'
  },
  {
    author: {
      authorName: 'Chris Annetts',
      authorDetails: '30 Jun 2017 · 4 min read',
      authorThumbnail: {
        src: '/assets/images/chris_blog.jpg',
        fallbackSrc: '/assets/images/chris_blog.jpg',
        alt: 'Chris'
      }
    },
    postUrl: '/blog/leaf-is-two-years-old',
    postImage: {
      src: '/assets/images/blog/thumbnails/2-yrs-old.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/2-yrs-old.jpg',
      alt: 'Leaf is two years old'
    },
    postHeading: 'Leaf is two years old - A few words to celebrate',
    postText:
      'By the age of two, many toddlers will have gained significant new skills; from improvements in their ability to …'
  },
  {
    author: {
      authorName: 'Chris Annetts',
      authorDetails: '30 May 2018 · 3 min read',
      authorThumbnail: {
        src: '/assets/images/chris_blog.jpg',
        fallbackSrc: '/assets/images/chris_blog.jpg',
        alt: 'Chris'
      }
    },
    postUrl: '/blog/how-to-write-better-work-enquiries',
    postImage: {
      src: '/assets/images/blog/thumbnails/better-enquiries.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/better-enquiries.jpg',
      alt: 'How to write better work enquiries'
    },
    postHeading: 'How to write better work enquiries',
    postText:
      'Five steps to start off on the right foot. As somebody with little-to-no experience of the web, the idea of enquiring …'
  },
  {
    author: {
      authorName: 'Chris Annetts',
      authorDetails: '9 May 2017 · 3 min read',
      authorThumbnail: {
        src: '/assets/images/chris_blog.jpg',
        fallbackSrc: '/assets/images/chris_blog.jpg',
        alt: 'Chris'
      }
    },
    postUrl: '/blog/fixed-cost-is-hurting-your-business',
    postImage: {
      src: '/assets/images/blog/thumbnails/fixed-costs.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/fixed-costs.jpg',
      alt: 'Fixed cost is hurting your business'
    },
    postHeading: 'Fixed cost is hurting your business',
    postText:
      'Projects turn in to games of brinksmanship, where neither side wins. If you’ve ever been on either side of …'
  },
  {
    author: {
      authorName: 'Mike Carter',
      authorDetails: '20 March 2017 · 4 min read',
      authorThumbnail: {
        src: '/assets/images/mike_blog.jpg',
        fallbackSrc: '/assets/images/mike_blog.jpg',
        alt: 'Mike'
      }
    },
    postUrl: '/blog/5-tips-for-actually-shipping-a-side-project',
    postImage: {
      src: '/assets/images/blog/thumbnails/boat.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/boat.jpg',
      alt: '5 tips for actually shipping a side project'
    },
    postHeading: '5 tips for actually shipping a side project',
    postText:
      'We took Howdy, our own little app, from an idea to a fully published SaaS application entirely in our spare time. During its development…'
  },
  {
    author: {
      authorName: 'Chris Annetts',
      authorDetails: '10 March 2017 · 2 min read',
      authorThumbnail: {
        src: '/assets/images/chris_blog.jpg',
        fallbackSrc: '/assets/images/chris_blog.jpg',
        alt: 'Chris'
      }
    },
    postUrl: '/blog/your-users-are-humans-too',
    postImage: {
      src: '/assets/images/blog/thumbnails/people-body-shots.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/people-body-shots.jpg',
      alt: 'Your users are humans too'
    },
    postHeading: 'Your users are humans too',
    postText:
      'You’ve been charged with redesigning the company website, and you’re stoked. You’ve met with stakeholders, created a tonne of user…'
  },
  {
    author: {
      authorName: 'Mike Carter',
      authorDetails: '2 March 2017 · 3 min read',
      authorThumbnail: {
        src: '/assets/images/mike_blog.jpg',
        fallbackSrc: '/assets/images/mike_blog.jpg',
        alt: 'Mike'
      }
    },
    postUrl: '/blog/there-are-no-excuses-for-poor-engineering-in-2017',
    postImage: {
      src: '/assets/images/blog/thumbnails/machine-room.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/machine-room.jpg',
      alt: 'There are no excuses for poor engineering in 2017'
    },
    postHeading: 'There are no excuses for poor engineering in 2017',
    postText:
      'Writing great code is easier than ever, and yet we act like it doesn’t matter'
  },
  {
    author: {
      authorName: 'Chris Annetts',
      authorDetails: '15 February 2017 · 3 min read',
      authorThumbnail: {
        src: '/assets/images/chris_blog.jpg',
        fallbackSrc: '/assets/images/chris_blog.jpg',
        alt: 'Chris'
      }
    },
    postUrl: '/blog/for-the-love-of-winning-work',
    postImage: {
      src: '/assets/images/blog/thumbnails/man-with-flowers.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/man-with-flowers.jpg',
      alt: 'For the love of winning work'
    },
    postHeading: 'For the love of winning work',
    postText:
      'My wife recently turned to me during an episode of First Dates and remarked how lucky we were that we’d, “never have to do that again”. She…'
  },
  {
    author: {
      authorName: 'Chris Annetts',
      authorDetails: '6 February 2017 · 2 min read',
      authorThumbnail: {
        src: '/assets/images/chris_blog.jpg',
        fallbackSrc: '/assets/images/chris_blog.jpg',
        alt: 'Chris'
      }
    },
    postUrl: '/blog/burnout-in-tech-and-why-you-could-be-part-of-the-problem',
    postImage: {
      src: '/assets/images/blog/thumbnails/burnout-man.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/burnout-man.jpg',
      alt: 'Burnout in tech, and why you could be part of the problem'
    },
    postHeading: 'Burnout in tech, and why you could be part of the problem',
    postText:
      'We all feel overwhelmed from time to time, and in a psychologically exhausting World of 24-hour iOS notifications and 15-man group chats…'
  },
  {
    author: {
      authorName: 'Chris Annetts',
      authorDetails: '31 January 2017 · 2 min read',
      authorThumbnail: {
        src: '/assets/images/chris_blog.jpg',
        fallbackSrc: '/assets/images/chris_blog.jpg',
        alt: 'Chris'
      }
    },
    postUrl: '/blog/the-importance-of-designing-with-empathy',
    postImage: {
      src: '/assets/images/blog/thumbnails/empathy.jpg',
      fallbackSrc: '/assets/images/blog/thumbnails/empathy.jpg',
      alt: 'The importance of designing with empathy'
    },
    postHeading: 'The importance of designing with empathy',
    postText:
      'Humans are hardwired to act emphatically, and yet it’s a skill we’re rapidly losing'
  }
]

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
