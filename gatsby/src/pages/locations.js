import React, { Component } from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby"

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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


class OfficeLocationPage extends Component {
  render() {
    const officeLocations = ((this.props.data.officeLocations||{}).edges||[]);
    const { classes } = this.props;
    return (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/locations.jpg')}
          header={`Our Locations` }
          subheader={`We're working 24/7 across the US`}
          logoFallback={<LocationOnIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Grid container spacing={24}>
            {officeLocations.map(({ node }) => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/locations/${node.slug}`}>{node.name}</Link>}
                  image={`https://media.graphcms.com/${node.thumbnail.file.handle}`}
                  description={<address>
                    {`${node.city}, ${node.state}`}
                  </address>}
                  onClick={console.log}
                  url={`/locations/${node.slug}`}
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

export default withRoot(withStyles(styles)(OfficeLocationPage));


export const OfficeLocationPageQuery = graphql`
  query getAllOfficeLocations {
    officeLocations: allOfficeLocation {
      edges {
        node {
          id
          slug
          name
          address
          address2
          city
          state
          zip
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
          photos {
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
          employees {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
