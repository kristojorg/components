/*
Goals of this Component

props {
  display: 'cover' | 'contain'
  src
  fade: bool
  background color
  image size??
  alt
  classname
}

Render a square that either has the full image cropped or contained.

When the image is loading, display the background color. If the mode is set to
cover and there is a placeholder color, display that in the middle with the right
aspect ratio according to the size.

It will also handle image load errors too!



*/

import React from 'react';
import classnames from 'classnames';

import './Image.css';
import AspectRatio from './AspectRatio';


export default class Image extends React.PureComponent {

  static defaultProps = {
    fade: true,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alt: 'image',
    display: 'contain'
  }

  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
  }

  onImageLoad = () => {
    this.setState({
      loaded: true,
    })
  }

  render() {
    const {display, src, fade, width, height, alt, className, backgroundColor} = this.props;

    const IMG = {
      contain: {
        backgroundColor: height && width && backgroundColor,
        height: '100%',
        width: '100%',
      }
    }

    // if we want to contain, maintain aspect ratio of image.
    if (display === 'contain' && height && width) {
      return (
        <AspectRatio
          height={height}
          width={width}
        >
          <div style={IMG.contain} className={className}>
            <img
              alt={alt}
              className={
                classnames({
                  imageLoaded: this.state.loaded,
                  fadeImageIn: fade,
                  'image-contain':display === 'contain',
                  'image-cover': display === 'cover'},
                  'image-element'
                )}
              src={src}
              onLoad={this.onImageLoad}
            />
          </div>
        </AspectRatio>
      )
    }

    // if we want to cover, do not maintain aspect ratio and just
    // make it 100% width and height.

    return (
      <div style={IMG.contain} className={className}>
        <img
          alt={alt}
          className={
            classnames({
              imageLoaded: this.state.loaded,
              fadeImageIn: fade,
              'image-contain':display === 'contain',
              'image-cover': display === 'cover'},
              'image-element'
            )}
          src={src}
          onLoad={this.onImageLoad}
        />
      </div>
    )
  }
}
