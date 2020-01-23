import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import BlogPostGridItem from './BlogPostGridItem'

class BlogPostGrid extends Component {
  constructor(props) {
    super(props)
  }

  renderGridItem(item, index) {
    const { postUrl, postCategory, postHeading, postMins, postText } = item
    return (
      <BlogPostGridItem
        key={`post-${index}`}
        postUrl={postUrl}
        postCategory={postCategory}
        postHeading={postHeading}
        postMins={postMins}
        postText={postText}
      />
    )
  }

  render() {
    const { gridItems } = this.props
    return <Fragment>{gridItems.map(this.renderGridItem.bind(this))}</Fragment>
  }
}

BlogPostGrid.propTypes = {
  allSmall: PropTypes.bool,
  gridItems: PropTypes.array.isRequired
}

export default BlogPostGrid
