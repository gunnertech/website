import React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";
import { graphql } from "gatsby"

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';




import FullScreenHeader from '../components/FullScreenHeader';
import ScreenSubHeader from '../components/ScreenSubHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
import Layout from "../components/layout"
import withRoot from '../withRoot';

const propTypes = {
  data: PropTypes.object.isRequired
};

class ClientDetailTemplate extends React.Component {
  render() {
    const { client } = this.props.data;
    return !client ? null : (
      <Layout>
        <FullScreenHeader 
          image={client.logo && client.logo.file && `https://media.graphcms.com/${client.logo.file.handle}`}
          logo={client.logo && client.logo.file && `https://media.graphcms.com/resize=w:300,h:300,fit:crop/${client.logo.file.handle}`}
          header={client.name}
          subheader={`Signed ${moment(client.hiredOn).format('l')}`}
        />

        {client.description.split("\n").map( (line, i) => 
          <Typography key={`client-description-${i}`} gutterBottom paragraph>{line}</Typography>
        )}
        
        <Section>
          <ScreenSubHeader title="Projects" />
          <Grid container spacing={24}>
            {client.projects.map(project => (
              <Grid key={project.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/projects/${project.id}`}>{project.title}</Link>}
                  image={!project.coverPhoto ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    project.coverPhoto.file.handle
                  }`}
                  logo={client.logo && client.logo.file && `https://media.graphcms.com/resize=w:300,h:300,fit:crop/${client.logo.file.handle}`}
                  description={`${moment(project.startDate).format('l')} - ${moment(project.actualLaunchDate).format('l')}`}
                  url={`/projects/${project.id}`}
                  slug="Learn More"
                />
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section>
          <ScreenSubHeader title="Industries" />
          <Grid container spacing={24}>
            {client.industries.map(node => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/industries/${node.slug}`}>{node.name}</Link>}
                  image={`https://media.graphcms.com/resize=w:900,fit:crop/${node.photo.file.handle}`}
                  logo={`https://media.graphcms.com/resize=w:300,h:300,fit:crop/${node.thumbnail.file.handle}`}
                  description={``}
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


ClientDetailTemplate.propTypes = propTypes;

export default withRoot(ClientDetailTemplate);

export const ClientDetailPageQuery = graphql`
  query getClientById($id: String!) {
    client(id: { eq: $id }) {
      id
      slug
      name
      description
      hiredOn
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
      projects {
        id
        title
        startDate
        projectedLaunchDate
        actualLaunchDate
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
      }
      entities {
        id
        slug
        name
      }
      industries {
        id
        slug
        name
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
`;
