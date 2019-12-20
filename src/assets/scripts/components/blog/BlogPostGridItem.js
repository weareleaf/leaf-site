import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BlogPostGridItem extends Component {
  render() {
    const { postUrl, postMeta, postHeading, postText } = this.props
    const postPrefix = 'post'

    return (
      <div className={'grid__item'}>
        <a className={postPrefix} href={postUrl}>
          <div className={`${postPrefix}__content`}>
            <h6 className={`${postPrefix}__meta`}>{postMeta}</h6>
            <h3 className={`${postPrefix}__heading`}>{postHeading}</h3>
            <p className={`${postPrefix}__text`}>{postText}</p>
          </div>
        </a>
      </div>
    )
  }
}

BlogPostGridItem.propTypes = {
  postUrl: PropTypes.string.isRequired,
  postMeta: PropTypes.string.isRequired,
  postHeading: PropTypes.string.isRequired,
  postText: PropTypes.string.isRequired
}

export default BlogPostGridItem
