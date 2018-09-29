import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';


class VideoModal extends Component {
  render () {
    const { url, open, onClose } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(-${50}%, -${50}%)`}}>
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper square={true} elevation={24}>
              { url ? <ReactPlayer url={url} playing /> : <div /> }
            </Paper>
          </Slide>
        </div>
      </Modal>
    )
  }
}

export default VideoModal;