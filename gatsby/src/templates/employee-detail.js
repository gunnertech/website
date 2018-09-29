import React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";
import { graphql } from "gatsby"

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ScreenSubHeader from '../components/ScreenSubHeader';
import FullScreenHeader from '../components/FullScreenHeader';

import SplitSection from '../components/SplitSection';
import MediaObject from '../components/MediaObject';

import Layout from "../components/layout"
import withRoot from '../withRoot';
import VideoModal from '../Containers/VideoModal';

const propTypes = {
  data: PropTypes.object.isRequired
};

const uniqBy = (a, key) => {
  let seen = {};
  return a.filter(item => {
    const k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}

const youtubeIdFromUrl = url =>
  url.split('v=').slice(-1)[0];

class EmployeeDetailTemplate extends React.Component {
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
    const { employee, employeeMarkdown } = this.props.data;
    return !employee ? null : (
      <Layout>
        <VideoModal url={this.state.videoUrl} open={this.state.videoModalOpen} onClose={this.handleVideoModalClose.bind(this)} />
        <FullScreenHeader 
          image={require('../assets/images/gunner-banner.jpg')}
          header={`${employee.name}` }
          subheader={employee.endDate ? (
            `${employee.title} - From ${moment(employee.hiredOn).format('l')} to ${moment(employee.endDate).format('l')}`
          ) : (
            `${employee.title} - Hired ${moment(employee.hiredOn).format('l')} - ${employee.intro}`
          )}
          logo={`https://media.graphcms.com/${employee.thumbnail.file.handle}`}
        />

        

        <SplitSection
          title={
            <ScreenSubHeader title={`About ${employee.name.split(' ')[0]}`} />
          }
          content={
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Paper elevation={4} style={{padding: 16}}>
                  {employeeMarkdown.childMarkdownRemark.html && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: employeeMarkdown.childMarkdownRemark.html
                      }}
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Grid container spacing={24}>
                  {
                    employee.videoUrl &&
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <MediaObject 
                        title="Video Intro"
                        image={`http://i3.ytimg.com/vi/${youtubeIdFromUrl(employee.videoUrl)}/hqdefault.jpg`}
                        description={`${employee.name} talks about working at Gunner Technology`}
                        onClick={this.handleVideoModalOpen.bind(this, employee.videoUrl)}
                        slug="Watch Now"
                      />
                    </Grid> 
                  }
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <MediaObject 
                      title={<Link to={`/locations/${employee.officeLocation.slug}`}>Location</Link>}
                      image={`https://media.graphcms.com/${employee.officeLocation.thumbnail.file.handle}`}
                      description={employee.officeLocation.name}
                      onClick={console.log}
                      url={`/locations/${employee.officeLocation.slug}`}
                      slug="View Location"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        />

        <SplitSection
          title={
            <ScreenSubHeader title="Projects" />
          }
          content={
            <Grid container spacing={24}>
              {uniqBy((employee.projectRoles||[]).map(projectRole => projectRole.project), JSON.stringify).filter(project => !!project).map(project =>
                <Grid key={project.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MediaObject 
                    title={<Link to={`/projects/${project.id}`}>{project.title}</Link>}
                    image={!project.coverPhoto ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                      project.coverPhoto.file.handle
                    }`}
                    logo={project.client && project.client.logo && `https://media.graphcms.com/resize=w:300,h:300,fit:crop/${project.client.logo.file.handle}`}
                    description={
                      <span>
                        Client: <Link to={`/clients/${project.client.slug}`}>{project.client.name}</Link><br />
                        Roles: 
                        {
                          project.projectRoles
                            .filter(projectRole => projectRole.employee.id === employee.id)
                            .map((projectRole, i) => 
                              <span>
                                {i !== 0 ? ', ' : ''}
                                <Link to={`/roles/${projectRole.role.slug}`}>{projectRole.role.name}</Link>
                              </span>
                            )
                        }
                      </span>
                    }
                    url={`/projects/${project.id}`}
                    slug="Learn More"
                  />
                </Grid>
              )} 
            </Grid>
          }
        />

        <SplitSection
          title={
            <ScreenSubHeader title="Certifications" />
          }
          content={
            <Grid container spacing={24}>
              {employee.certifications.map(certification =>
              
                <Grid key={certification.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MediaObject 
                    title={<Link to={`/certifications/${certification.id}`}>{certification.name}</Link>}
                    image={`https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                      certification.media.file.handle
                    }`}
                    logo={`https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                      certification.media.file.handle
                    }`}
                    description={<span />}
                    url={`/certifications/${certification.id}`}
                    slug="Learn More"
                  />
                </Grid>
              )} 
            </Grid>
          }
        />

        <SplitSection
          title={
            <ScreenSubHeader title="Proficiencies" />
          }
          content={
            <Grid container spacing={24}>
              {employee.proficiencies.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(proficiency => 
                <Grid key={proficiency.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MediaObject 
                    title={<Link to={`/proficiencies/${proficiency.slug}`}>{proficiency.name}</Link>}
                    image={!proficiency.logo ? (
                        require('../assets/images/proficiencies-banner.jpg')
                      ) : (
                        `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${proficiency.logo.file.handle}`
                      )
                    }
                    logo={!proficiency.logo ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                      proficiency.logo.file.handle
                    }`}
                    logoFallback={
                      proficiency.name.split(" ").map(word => word.substring(0,1).toUpperCase()).slice(0,2).join("")
                    }
                    description={proficiency.briefDescription}
                    url={`/proficiencies/${proficiency.id}`}
                    slug="Learn More"
                  />
                </Grid>
              )} 
            </Grid>
          }
        />
      </Layout>
    );
  }
}

EmployeeDetailTemplate.propTypes = propTypes;

export default withRoot(EmployeeDetailTemplate);

export const EmployeeDetailPageQuery = graphql`
  query getEmployeeById($id: String!, $mdid: String!) {
    employee(id: { eq: $id }) {
      id
      slug
      name
      active
      hiredOn
      position
      intro
      bio
      title
      videoUrl
      endDate
      certifications {
        id
        name
        media {
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
      officeLocation {
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
      proficiencies {
        id
        slug
        name
        briefDescription
        description
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
      projectRoles {
        id
        project {
          id
          title
          startDate
          projectedLaunchDate
          actualLaunchDate
          projectRoles {
            id
            employee {
              id
            }
            role {
              id
              slug
              name
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
        role {
          id
          slug
          name
        }
      }
    }
    employeeMarkdown(id: { eq: $mdid }) {
      id
      childMarkdownRemark {
        html
      }
    }
  }
`;
