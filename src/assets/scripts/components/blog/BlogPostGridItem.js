import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class BlogPostGridItem extends Component {
  render() {
    const { author, large, postUrl, postImage, postHeading, postText } = this.props
    const postPrefix = large ? 'post-large' : 'post'

    return (
      <div className={large ? 'grid__item-large' : 'grid__item'}>
        <a className={postPrefix} href={postUrl}>
          <div className={`${postPrefix}__content`}>
            <h6 className={`${postPrefix}__meta`}>{postHeading}</h6>
            <h3 className={`${postPrefix}__heading`}>{postHeading}</h3>
            <p className={`${postPrefix}__text`}>{postText}</p>
          </div>
        </a>
      </div>
    )
  }
}

BlogPostGridItem.propTypes = {
  large: PropTypes.bool,
  author: PropTypes.object.isRequired,
  postUrl: PropTypes.string.isRequired,
  postImage: PropTypes.object.isRequired,
  postHeading: PropTypes.string.isRequired,
  postText: PropTypes.string.isRequired
}

export default BlogPostGridItem
