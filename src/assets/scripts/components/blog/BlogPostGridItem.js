import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BlogPostGridItem extends Component {
  render() {
    const { postUrl, postCategory, postHeading, postMins, postText } = this.props
    const postPrefix = 'post'

    return (
      <div className={'grid__item'}>
        <a className={postPrefix} href={postUrl}>
          <div className={`${postPrefix}__content`}>
            <div className={`${postPrefix}__meta`}>
              <span className={`${postPrefix}__category`}>{postCategory}</span>
              <span className={`${postPrefix}__middle-dot`}>&middot;</span>
              <span className={`${postPrefix}__mins`}>{postMins} min read</span>
            </div>
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
  postCategory: PropTypes.string.isRequired,
  postHeading: PropTypes.string.isRequired,
  postMins: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired
}

export default BlogPostGridItem
