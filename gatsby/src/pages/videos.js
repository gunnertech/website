import React, { Component } from "react";
import { graphql } from "gatsby"

import Grid from '@material-ui/core/Grid';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import { withStyles } from '@material-ui/core/styles';

import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
import Layout from "../components/layout"
import withRoot from '../withRoot';
import VideoModal from '../Containers/VideoModal';

const styles = theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 96,
  },
});

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoModalOpen: false,
      videoUrl: null,
    };
  }

  handleVideoModalClose = () =>
    this.setState({videoModalOpen: false});

  handleVideoModalOpen = url =>
    this.setState({videoModalOpen: true, videoUrl: url});

  render() {
    const { classes, data } = this.props;
    return !data || !data.allYoutubeVideo ? null : (
      <Layout>
        <VideoModal url={this.state.videoUrl} open={this.state.videoModalOpen} onClose={this.handleVideoModalClose.bind(this)} />
        <FullScreenHeader 
          header={`The Gunner Tech Show` }
          subheader={<span>Check us out every Thursday at 1 p.m. Eastern time on <a rel="noopener noreferrer nofollow" target="_blank" href="https://facebook.com/gunnertechnology">Facebook</a>, <a target="_blank" rel="noopener noreferrer nofollow" href="https://youtube.com/channel/UCjURDi2kurZOJFK1OY-QRHg">YouTube</a> or <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.periscope.tv/gunnertech">Periscope</a></span>}
          image={require('../assets/images/gunner-banner.jpg')}
          logoFallback={<OndemandVideoIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Grid container spacing={24}>
            {data.allYoutubeVideo.edges.map(({ node }) => (
              <Grid key={node.videoId} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject
                  onClick={this.handleVideoModalOpen.bind(this, `https://www.youtube.com/watch?v=${node.videoId}`)}
                  title={node.title}
                  image={node.thumbnail.url}
                  description={node.description}
                  url={``}
                  slug="Watch Now"
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(PostPage));


export const pageQuery = graphql`
  query getAllYouTubeVideos {
    allYoutubeVideo {
      edges {
        node {
          id
          title
          description
          videoId
          publishedAt
          privacyStatus
          thumbnail {
            url
          }
        }
      }
    }
  }
`