import React, { Component } from 'react'
// import Modal from '@material-ui/core/Modal';
// import Paper from '@material-ui/core/Paper';
// import Slide from '@material-ui/core/Slide';
import Lightbox from 'react-images';

class PhotoModal extends Component {
  static getDerivedStateFromProps(props, state) {
    if(props.open !== state.prevOpen) {
      return {
        prevOpen: props.open,
        lightboxIsOpen: props.open
      }
    }

    return null;
  }

  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  componentDidMount() {
    this.setState({
      lightboxIsOpen: this.props.open,
    })
  }

  render () {
    const { urls } = this.props;
    const photos = urls.map(url => ({src: url}))
    return (
      <div>
        <Lightbox images={photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )
  }
}

export default PhotoModal;