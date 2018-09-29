import React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";
import { graphql } from "gatsby"

// import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BuildIcon from '@material-ui/icons/Build';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BriefcaseIcon from 'mdi-material-ui/Briefcase'


import ScreenSubHeader from '../components/ScreenSubHeader';
import FullScreenHeader from '../components/FullScreenHeader';

import MediaObject from '../components/MediaObject';

import Layout from "../components/layout"
import withRoot from '../withRoot';

const propTypes = {
  data: PropTypes.object.isRequired
};

const styles = theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 96,
  },
});

class EntityDetailTemplate extends React.Component {
  render() {
    const { entity, entityMarkdown } = this.props.data;
    const { classes } = this.props;
    return !entity ? null : (
      <Layout>
        <FullScreenHeader 
          image={`https://media.graphcms.com/${entity.coverPhoto.file.handle}`}
          header={entity.name}
          subheader={entity.description}
          logoFallback={
            entity.slug === 'public-sector' ? (
              <AccountBalanceIcon className={classes.avatar} />
            ) : entity.slug === 'private-sector' ? (
              <BriefcaseIcon className={classes.avatar} />
            ) : (
              <BuildIcon className={classes.avatar} />
            )
          }
          avatarClass={classes.avatar}
        />

        {entityMarkdown.childMarkdownRemark.html && (
          <div
            dangerouslySetInnerHTML={{
              __html: entityMarkdown.childMarkdownRemark.html
            }}
          />
        )}

        <ScreenSubHeader title={entity.name === 'Public Sector' ? 'Clients' : 'Clients'} />

        <Grid container spacing={24}>
          {entity.clients.map((client, i) => (
            <Grid key={client.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
              {
                !client.logo ? (
                  <span>{client.name}</span>
                ) : (
                  <MediaObject 
                    title={<Link to={`/clients/${client.slug}`}>{client.name}</Link>}
                    image={client.logo && client.logo.file && `https://media.graphcms.com/resize=h:200,a:top,fit:scale/${
                      client.logo.file.handle
                    }`}
                    logo={client.logo && client.logo.file && `https://media.graphcms.com/resize=h:300,w:300,a:top,fit:crop/${
                      client.logo.file.handle
                    }`}
                    description={
                      <Typography component="p">
                        Industries: {client.industries.map((industry, i) => 
                          <span key={industry.id}>
                            {
                              i > 0 ? (
                                ', '
                              ) : (
                                ''
                              )
                            }
                            <Link to={`/industries/${industry.slug}`}>{industry.name}</Link>
                          </span>
                        )}
                      </Typography>
                    }
                    url={`/clients/${client.slug}`}
                    slug="Learn More"
                  />
                )
              }
            </Grid>
          ))}
        </Grid>
      </Layout>
    );
  }
}

EntityDetailTemplate.propTypes = propTypes;

export default withRoot(withStyles(styles)(EntityDetailTemplate));

export const EntityDetailPageQuery = graphql`
  query getEntityById($id: String!, $mdid: String!) {
    entity(id: { eq: $id }) {
      id
      slug
      name
      description
      pitch
      coverPhoto {
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
      clients {
        id
        slug
        name
        description
        position
        hiredOn
        industries {
          id
          slug
          name
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
        logo {
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
    entityMarkdown(id: { eq: $mdid }) {
      id
      childMarkdownRemark {
        html
      }
    }
  }
`;
