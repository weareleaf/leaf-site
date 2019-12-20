import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import BlogPostGridItem from './BlogPostGridItem'

class BlogPostGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageLoaded: window.pageLoaded || false
    }
  }

  componentDidMount() {
    const { pageLoaded } = this.state
    if (!pageLoaded) {
      window.addEventListener('load', () => {
        window.pageLoaded = true
        this.setState({ pageLoaded: true })
      })
    }
  }

  renderGridItem(item, index) {
    const { postUrl, postMeta, postHeading, postText } = item
    return (
      <BlogPostGridItem
        key={`post-${index}`}
        postUrl={postUrl}
        postMeta={postMeta}
        postHeading={postHeading}
        postText={postText}
      />
    )
  }

  render() {
    const { pageLoaded } = this.state
    const { gridItems } = this.props

    if (!pageLoaded) {
      return null
    }

    return <Fragment>{gridItems.map(this.renderGridItem.bind(this))}</Fragment>
  }
}

BlogPostGrid.propTypes = {
  allSmall: PropTypes.bool,
  gridItems: PropTypes.array.isRequired
}

export default BlogPostGrid
