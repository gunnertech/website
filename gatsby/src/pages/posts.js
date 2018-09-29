import React, { Component } from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby"

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';


import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
import Layout from "../components/layout"
import withRoot from '../withRoot';

const styles = theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 96,
  },
});

class PostPage extends Component {
  render() {
    const { data, classes } = this.props;
    return !data || !data.allWordpressPost ? null : (
      <Layout>
        <FullScreenHeader 
          header={`The Gunner Blog` }
          subheader={`The Latest from Gunner Technology posted every Thursday afternoon`}
          image={require('../assets/images/gunner-banner.jpg')}
          logoFallback={<CreateIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Grid container spacing={24}>
            {data.allWordpressPost.edges.map(({ node }) => (
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/posts/${node.slug}`}>{
                    node.title
                      .replace(/&nbsp;/g, ' ')
                      .replace(/&amp;/g, '&')
                      .replace(/&#8217;/g, '\'')
                      .replace(/&#822[01];/g, '"')
                  }</Link>}
                  image={((((node.featured_media||{}).localFile||{}).childImageSharp||{}).sizes||{}).src}
                  description={<div dangerouslySetInnerHTML={{ __html: node.excerpt.replace(/\/20\d\d\/\d\d\/\d\d/g,'').replace(/<a.+<\/a>/g,'') }} />}
                  url={`/posts/${node.slug}`}
                  slug="Read More"
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
  query getAllWordpressPosts {
    allWordpressPost(sort: { order: DESC, fields: [date] }) {
      edges {
        node {
          id
          slug
          title
          content
          excerpt
          modified
          date( formatString: "MM/DD/YYYY" )
          featured_media {
            localFile {
              childImageSharp {
                sizes( maxWidth: 2000 ) {
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
          template
          status
        }
      }
    }
  }
`