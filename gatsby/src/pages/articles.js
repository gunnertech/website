import React, { Component } from "react";
import { graphql } from "gatsby"
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import Layout from "../components/layout"
import MediaObject from '../components/MediaObject';
import withRoot from '../withRoot';

const styles = theme => ({
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  container: {
    backgroundColor: 'white'
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 96,
  },
});

class ArticlePage extends Component {
  render() {
    const articles = ((this.props.data.articles||{}).edges||[]);
    const { classes } = this.props;
    return (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/articles.jpg')}
          header={`Gunner in the News` }
          subheader={`We've been featured in media around the world.`}
          logoFallback={<BusinessCenterIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Typography paragraph>Gunner Technology and its employees regularly talk to the media as expert sources.</Typography>
          <Typography paragraph>We've been featured across 20 different outlets, including USA Today, NPR and the Wall Street Journal.</Typography>
        </Section>

        <Section>
          <Grid container spacing={24}>
            {articles.map(({ node }) => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<a rel="noopener noreferrer nofollow" target="_blank" href={node.url}>{node.headline}</a>}
                  image={node.coverPhoto ? (
                      `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${node.coverPhoto.file.handle}`
                    ) : node.media ? (
                      `https://media.graphcms.com/${node.media.file.handle}`
                    ) : (
                      require('../assets/images/articles.jpg')
                    )
                  }
                  logo={!node.sourceObj || !node.sourceObj.logo ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    node.sourceObj.logo.file.handle
                  }`}
                  logoFallback={
                    (node.sourceObj ? node.sourceObj.name : node.source)
                      .split(" ")
                      .map(word => word.substring(0,1).toUpperCase())
                      .slice(0,2)
                      .join("")
                  }
                  description={
                    <span>
                      <Typography variant="body2">{node.sourceObj ? node.sourceObj.name : node.source}</Typography>
                      Published <time>{moment(node.awardedOn).format('l')}</time>
                    </span>
                  }
                  url={node.url}
                  slug={`Read Article`}
                  external
                />
              </Grid>
            )}
          </Grid>  
        </Section>
      </Layout>
    );
  }
}
export default withRoot(withStyles(styles)(ArticlePage));

export const ArticlePageQuery = graphql`
  query getAllArticles {
    articles: allArticle(
      sort: { fields: [publishedOn], order: DESC}
    ) {
      edges {
        node {
          id
          headline
          description
          url
          publishedOn
          source
          coverPhoto {
            id
            title
            file {
              id
              handle
              width
              height
            }
          }
          sourceObj {
            id
            name
            slug
            logo {
              id
              title
              file {
                id
                handle
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;





// <Paper elevation={4}>
//   <List>
//     {articles.map(({node}) =>
//       <ListItem key={node.id} divider className={classes.container}>
//         <ListItemText 
//           primary={<a rel="noopener noreferrer nofollow" target="_blank" href={node.url}>{node.headline}</a>} 
//           secondary={<span><em>{node.source}</em> - {moment(node.publishedOn).format('l')}<time></time></span>}
//         />
//         <ListItemSecondaryAction>
//           <IconButton aria-label="More" href={node.url} rel="noopener noreferrer nofollow" target="_blank">
//             <ArrowForwardIosIcon />
//           </IconButton>
//         </ListItemSecondaryAction>
//       </ListItem>  
//     )}  
//   </List>
// </Paper>

// import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import IconButton from '@material-ui/core/IconButton';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';