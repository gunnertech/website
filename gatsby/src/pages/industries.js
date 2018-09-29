import React, { Component } from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby"

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';

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

class IndustryPage extends Component {
  render() {
    const industries = ((this.props.data.industries||{}).edges||[]);
    const { classes } = this.props;
    return (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/industries.jpeg')}
          header={`Industries` }
          subheader={`We bring custom solutions to over 15 different industries`}
          logoFallback={<BusinessIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Grid container spacing={24}>
            {industries
              .filter(({ node }) => node.clients.length > 0)
              .map(({ node }) => node)
              .sort((a, b) => a.clients.length > b.clients.length ? -1 : 1)
              .map(node => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/industries/${node.slug}`}>{node.name}</Link>}
                  image={`https://media.graphcms.com/resize=w:900,fit:crop/${node.photo.file.handle}`}
                  logo={`https://media.graphcms.com/resize=w:300,h:300,fit:crop/${node.thumbnail.file.handle}`}
                  description={`${node.clients.length} clients`}
                  onClick={console.log}
                  url={`/industries/${node.slug}`}
                  slug="View Details"
                />
              </Grid>
            )}
          </Grid>
        </Section>

      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(IndustryPage));

export const IndustryPageQuery = graphql`
  query getAllIndustrys {
    industries: allIndustry {
      edges {
        node {
          id
          slug
          name
          description
          pitch
          clients {
            id
            slug
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
          photo {
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
