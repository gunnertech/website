import React, { Component } from "react";
import { graphql } from "gatsby"

import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import Layout from "../components/layout"
import MediaObject from '../components/MediaObject';
import withRoot from '../withRoot';

const styles = theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 96,
  },
});
class PublicationPage extends Component {
  render() {
    const publications = ((this.props.data.publications||{}).edges||[]);
    const { classes } = this.props;
    return (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/gunner-technology-publications.jpg')}
          header={`Our Publications` }
          subheader={`Check out our e-books collection`}
          logoFallback={<LibraryBooksIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Typography paragraph>Gunner Technology regularly publishes original books on technology and business.</Typography>
          <Typography paragraph>We aim to publish a new book every six months and you can always find them on iTunes, Amazon, Barnes &amp; Noble and Kobo.</Typography>
        </Section>

        <Section>
          <Grid container spacing={24}>
            {publications.map(({ node }) => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={node.name}
                  image={node.coverPhoto ? (
                      `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${node.coverPhoto.file.handle}`
                    ) : node.thumbnail ? (
                      `https://media.graphcms.com/${node.thumbnail.file.handle}`
                    ) : (
                      require('../assets/images/articles.jpg')
                    )
                  }
                  logo={!node.thumbnail ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    node.thumbnail.file.handle
                  }`}
                  logoFallback={
                    node.name
                      .split(" ")
                      .map(word => word.substring(0,1).toUpperCase())
                      .slice(0,2)
                      .join("")
                  }
                  description={
                    <div>
                      <Typography variant="body2">Published <time>{moment(node.publishedOn).format('l')}</time></Typography>
                      {node.description.split("\n").map((line, i) => 
                        <Typography key={`briefDescription-${i}`} paragraph gutterBottom>{line}</Typography>
                      )}
                      <Typography variant="body2">
                        Available On:
                      </Typography>
                      <List dense disablePadding>
                        {node.links.map(link =>
                          <ListItem key={link.id} disableGutters>
                            <ListItemText
                              primary={<a rel="noopener noreferrer nofollow" target="_blank" href={link.url}>{link.name}</a>}
                            />
                          </ListItem>
                        )}
                      </List>
                    </div>
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

export default withRoot(withStyles(styles)(PublicationPage));

export const PublicationPageQuery = graphql`
  query getAllPublications {
    publications: allPublication(
      sort: { fields: [publishedOn], order: DESC}
    ) {
      edges {
        node {
          id
          name
          description
          publishedOn
          links {
            id
            name
            url
          }
          thumbnail {
            id
            title
            description
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
`;
