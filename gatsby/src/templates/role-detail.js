import React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";
import { graphql } from "gatsby"

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import ScreenSubHeader from '../components/ScreenSubHeader';
import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
import EmployeeListItem from '../components/EmployeeListItem';

import Layout from "../components/layout"
import withRoot from '../withRoot';


const propTypes = {
  data: PropTypes.object.isRequired
};

class RoleDetailTemplate extends React.Component {
  render() {
    const { role } = this.props.data;
    return !role ? null : (
      <Layout>
        <FullScreenHeader 
          image={`https://media.graphcms.com/${role.coverPhoto.file.handle}`}
          header={`${role.name}` }
        />
        {role.description.split("\n\n").map((line, i) => 
          <Typography key={`problem-statement-${i}`} gutterBottom paragraph>{
            line.split("\n").map((subline, j) => <span key={`${i}-${j}`}>{subline}<br /></span>)
          }</Typography>
        )}
        
        <Section>
          <ScreenSubHeader title="Employees" />
          <List>
            {role.projectRoles.map(projectRole => 
              <EmployeeListItem key={projectRole.id} employee={projectRole.employee} />
            )}
          </List>
        </Section>

        <Section>
          <ScreenSubHeader title="Projects" />
          <Grid container spacing={24}>
            {role.projectRoles.filter(projectRole => !!projectRole.project).map(projectRole => (
              <Grid key={projectRole.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/projects/${projectRole.project.id}`}>{projectRole.project.title}</Link>}
                  image={projectRole.project.coverPhoto && projectRole.project.coverPhoto.file && `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    projectRole.project.coverPhoto.file.handle
                  }`}
                  logo={projectRole.project.client && projectRole.project.client.logo && `https://media.graphcms.com/resize=w:300,h:300,fit:crop/${projectRole.project.client.logo.file.handle}`}
                  description={<Link to={`/clients/${projectRole.project.client.slug}`}>{projectRole.project.client.name}</Link>}
                  url={`/projects/${projectRole.project.id}`}
                  slug="Learn More"
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Layout>
    );
  }
}

RoleDetailTemplate.propTypes = propTypes;

export default withRoot(RoleDetailTemplate);

export const RoleDetailPageQuery = graphql`
  query getRoleById($id: String!) {
    role(id: { eq: $id }) {
      id
      slug
      name
      description
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
      projectRoles {
        id
        project {
          id
          title
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
          client {
            id
            slug
            name
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
        employee {
          id
          slug
          name
          title
          intro
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
