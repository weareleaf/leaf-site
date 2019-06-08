import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import BlogPostGridItem from './BlogPostGridItem'

class BlogPostGrid extends Component {
  renderGridItem(item, index) {
    const { allSmall } = this.props
    const { author, postUrl, postImage, postHeading, postText} = item
    const large = index == 0 && !allSmall
    return (
      <BlogPostGridItem
        author={author}
        large={large}
        postUrl={postUrl}
        postImage={postImage}
        postHeading={postHeading}
        postText={postText}
      />
    )
  }

  render() {
    const { gridItems } = this.props
    return (
      <Fragment>
        {gridItems.map(this.renderGridItem.bind(this))}
      </Fragment>
    )
  }
}

BlogPostGrid.propTypes = {
  allSmall: PropTypes.bool,
  gridItems: PropTypes.array.isRequired
}

export default BlogPostGrid
