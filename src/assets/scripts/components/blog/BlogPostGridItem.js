import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class BlogPostGridItem extends Component {
  render() {
    const { author, large, postUrl, postImage, postHeading, postText} = this.props
    const postPrefix = large ? 'post-large' : 'post'

    return (
      <div className={large ? 'grid__item-large' : 'grid__item'}>
        <a className={postPrefix} href={postUrl}>
          <picture className={large ? 'post-large__image' : 'post__image'}>
            <source srcSet={postImage.src} type="image/webp" />
            <img src={postImage.fallbackSrc} alt="A home office for productivity" />
          </picture>
          <div className={`${postPrefix}__content`}>
            <h3 className={`${postPrefix}__heading`}>{postHeading}</h3>
            <p className={`${postPrefix}__text`}>{postText}</p>
            <div className={`${postPrefix}__footer`}>
              <div className="author author--margin-top">
                <picture className="author__thumbnail">
                  <source srcSet={author.authorThumbnail.src} type="image/webp" />
                  <img src={author.authorThumbnail.fallbackSrc} alt="Mike" />
                </picture>
                <div className="author__content">
                  <h5 className="author__name">{author.authorName}</h5>
                  <p className="author__details">{author.authorDetails}</p>
                </div>
              </div>
            </div>
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
