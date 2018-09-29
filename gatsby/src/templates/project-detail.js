import React from "react";
import * as PropTypes from "prop-types";
import { graphql, Link } from "gatsby"
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import VideoModal from '../Containers/VideoModal';
import PhotoModal from '../Containers/PhotoModal';


import FullScreenHeader from '../components/FullScreenHeader';
import ScreenSubHeader from '../components/ScreenSubHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
import SplitSection from '../components/SplitSection';
// import FactSheet from '../components/FactSheet';
// import EmployeeListItem from '../components/EmployeeListItem';

import Layout from "../components/layout"
import withRoot from '../withRoot';

const uniqBy = (a, key) => {
  let seen = {};
  return a.filter(item => {
    const k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}

const styles = theme => ({
  item: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
});

const propTypes = {
  data: PropTypes.object.isRequired
};

const youtubeIdFromUrl = url =>
  url.split('v=').slice(-1)[0];

class ProjectDetailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoModalOpen: false,
      photoModalOpen: false,
      videoUrl: null,
      photoUrls: []
    };
  }

  handleVideoModalClose = () =>
    this.setState({videoModalOpen: false});

  handleVideoModalOpen = url =>
    this.setState({videoModalOpen: true, videoUrl: url});

  handlePhotoModalClose = () =>
    this.setState({photoModalOpen: false});

  handlePhotoModalOpen = urls =>
    this.setState({photoModalOpen: true, photoUrls: urls});

  render() {
    const { project } = this.props.data;
    const { classes } = this.props;
    return !project ? null : (
      <Layout>
        <VideoModal url={this.state.videoUrl} open={this.state.videoModalOpen} onClose={this.handleVideoModalClose.bind(this)} />
        <PhotoModal urls={this.state.photoUrls} open={this.state.photoModalOpen} onClose={this.handlePhotoModalClose.bind(this)} />

        <FullScreenHeader 
          image={!project.coverPhoto ? null : `https://media.graphcms.com/${project.coverPhoto.file.handle}`}
          logo={project.client && project.client.logo && `https://media.graphcms.com/${project.client.logo.file.handle}`}
          header={project.title}
          subheader={<span><time>{moment(project.startDate).format('l')}</time> to <time>{moment(project.actualEndDate).format('l')}</time>: {project.briefDescription}</span>}
        />

        <SplitSection
          force
          title={
            <ScreenSubHeader title={`Client`} />
          }
          content={
            <Grid container spacing={24}>
              {[project.client].map((client, i) => (
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
          }
        />


        <Section>
          <Grid container spacing={24}>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
              <ScreenSubHeader title="Problem" excludeParagraph>
                <Typography>What was the problem to be solved?</Typography>
              </ScreenSubHeader>
            </Grid>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Paper elevation={4} style={{padding: 16}}>
                {project.problemStatement.split("\n").map((line, i) => 
                  <Typography key={`problem-statement-${i}`} gutterBottom paragraph>{line}</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={24}>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
              <ScreenSubHeader title="Solution" excludeParagraph>
                <Typography>What was the proposed solution?</Typography>
              </ScreenSubHeader>
            </Grid>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Paper elevation={4} style={{padding: 16}}>
                {project.solutionStatement.split("\n").map((line, i) => 
                  <Typography key={`solution-statement-${i}`} gutterBottom paragraph>{line}</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={24}>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
              <ScreenSubHeader title="Challenges" excludeParagraph>
                <Typography>What challenges arose during the project?</Typography>
              </ScreenSubHeader>
            </Grid>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Paper elevation={4} style={{padding: 16}}>
                {project.challengeStatement.split("\n").map((line, i) => 
                  <Typography key={`challenge-statement-${i}`} gutterBottom paragraph>{line}</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={24}>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
              <ScreenSubHeader title="Technical" excludeParagraph>
                <Typography>What was the technical approach to the project?</Typography>
              </ScreenSubHeader>
            </Grid>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Paper elevation={4} style={{padding: 16}}>
                {project.technicalApproach.split("\n").map((line, i) => 
                  <Typography key={`technicalApproach-${i}`} gutterBottom paragraph>{line}</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Section>
        
        {
          project.projectManagementApproach && 
          <Section>
            <Grid container spacing={24}>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
                <ScreenSubHeader title="Management" excludeParagraph>
                  <Typography>What was the project management approach to the project?</Typography>
                </ScreenSubHeader>
              </Grid>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Paper elevation={4} style={{padding: 16}}>
                  {project.projectManagementApproach.split("\n").map((line, i) => 
                    <Typography key={`projectManagementApproach-${i}`} gutterBottom paragraph>{line}</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Section>
        }

        {
          project.lessonsLearned &&
          <Section>
            <Grid container spacing={24}>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
                <ScreenSubHeader title="Lessons" excludeParagraph>
                  <Typography>What did you learn from working on this project?</Typography>
                </ScreenSubHeader>
              </Grid>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Paper elevation={4} style={{padding: 16}}>
                  {project.lessonsLearned.split("\n").map((line, i) => 
                    <Typography key={`lessonsLearned-${i}`} gutterBottom paragraph>{line}</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Section>
        }

        {
          project.pitch && 
          <Section>
            <Grid container spacing={24}>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
                <ScreenSubHeader title="Why Gunner?" excludeParagraph>
                  <Typography>Why was Gunner selected for this project?</Typography>
                </ScreenSubHeader>
              </Grid>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Paper elevation={4} style={{padding: 16}}>
                  {(project.pitch||"").split("\n").map((line, i) => 
                    <Typography key={`pitch-${i}`} gutterBottom paragraph>{line}</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Section>
        }

        {
          project.architecturalDescription && 
          <Section>
            <Grid container spacing={24}>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
                <ScreenSubHeader title="Architectural Description" excludeParagraph>
                  <Typography>What platform was built for this project?</Typography>
                </ScreenSubHeader>
              </Grid>
              <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Paper elevation={4} style={{padding: 16}}>
                  {(project.architecturalDescription||"").split("\n").map((line, i) => 
                    <Typography key={`architecturalDescription-${i}`} gutterBottom paragraph>{line}</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Section>
        }


        

        <Section>
          <Grid container spacing={24}>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
              <ScreenSubHeader title="The Team" excludeParagraph>
                <Typography>Who worked on this project?</Typography>
              </ScreenSubHeader>
            </Grid>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
            <Grid container spacing={24}>
                {uniqBy((project.projectRoles||[]).map(projectRole => projectRole.employee), JSON.stringify).filter(project => !!project).map(employee =>
                  <Grid key={project.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <MediaObject 
                      title={<Link to={`/employees/${employee.slug}`}>{employee.name}</Link>}
                      image={!employee.coverPhoto ? (
                        require('../assets/images/gunner-banner.jpg')
                        ) : (
                          `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${employee.coverPhoto.file.handle}`
                        )
                      }
                      logo={!employee.thumbnail ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                        employee.thumbnail.file.handle
                      }`}
                      logoFallback={
                        employee.name.split(" ").map(word => word.substring(0,1).toUpperCase()).slice(0,2).join("")
                      }
                      description={
                        <div>
                          <Typography variant="body2">Project Roles</Typography> 
                          {
                            project.projectRoles
                              .filter(pr => pr.employee.id === employee.id)
                              .map((projectRole, i) => 
                                <span>
                                  {i !== 0 ? ', ' : ''}
                                  <Link to={`/roles/${projectRole.role.slug}`}>{projectRole.role.name}</Link>
                                </span>
                              )
                          }
                        </div>
                      }
                      url={`/employees/${employee.id}`}
                      slug="Learn More"
                    />
                  </Grid>
                )} 
              </Grid>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={24}>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
              <ScreenSubHeader title="Proficiencies" excludeParagraph>
                <Typography>What tools, techniques and methodologies were used on this project?</Typography>
              </ScreenSubHeader>
            </Grid>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Grid container spacing={24}>
                {project.proficiencies.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(proficiency => 
                  <Grid key={proficiency.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <MediaObject 
                      title={<Link to={`/proficiencies/${proficiency.slug}`}>{proficiency.name}</Link>}
                      image={proficiency.coverPhoto ? (
                          `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${proficiency.coverPhoto.file.handle}`
                        ) : proficiency.logo ? (
                          `https://media.graphcms.com/${proficiency.logo.file.handle}`
                        ) : (
                          require('../assets/images/proficiencies-banner.jpg')
                        )
                      }
                      logo={!proficiency.logo ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                        proficiency.logo.file.handle
                      }`}
                      logoFallback={
                        proficiency.name.split(" ").map(word => word.substring(0,1).toUpperCase()).slice(0,2).join("")
                      }
                      description={proficiency.briefDescription}
                      url={`/proficiencies/${proficiency.slug}`}
                      slug="Learn More"
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={24}>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={2} xl={2}>
              <ScreenSubHeader title="Showcase &amp; Media"></ScreenSubHeader>
            </Grid>
            <Grid className={classes.item} item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Grid container spacing={24}>
                {
                  !project.caseStudyVideoUrl ? null : (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <MediaObject 
                        title="Video Case Study"
                        image={`http://i3.ytimg.com/vi/${youtubeIdFromUrl(project.caseStudyVideoUrl)}/hqdefault.jpg`}
                        description="Post Mortem Discussion"
                        onClick={this.handleVideoModalOpen.bind(this, project.caseStudyVideoUrl)}
                        slug="Watch Now"
                      />
                    </Grid>
                  )
                }

                {
                  !project.teamDiscussionVideoUrl ? null : (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <MediaObject 
                        title="Project Discussion"
                        image={`http://i3.ytimg.com/vi/${youtubeIdFromUrl(project.teamDiscussionVideoUrl)}/hqdefault.jpg`}
                        description="The Gunner Team breaks down the project"
                        onClick={this.handleVideoModalOpen.bind(this, project.teamDiscussionVideoUrl)}
                        slug="Watch Now"
                      />
                    </Grid>
                  )
                }
                
                {
                  !(project.wireframes||[]).length ? null : (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <MediaObject 
                        title="Wireframes"
                        image={project.wireframes.map(image => `https://media.graphcms.com/${image.file.handle}`)[0]}
                        description={`Check out wireframs of this project`}
                        onClick={this.handlePhotoModalOpen.bind(this, project.wireframes.map(image => `https://media.graphcms.com/${image.file.handle}`))}
                        slug="View Gallery"
                      />
                    </Grid>
                  )
                }

                {
                  !(project.screenshots||[]).length ? null : (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <MediaObject 
                        title="Screenshots"
                        image={project.screenshots.map(image => `https://media.graphcms.com/${image.file.handle}`)[0]}
                        description={`Check out photos of this project`}
                        onClick={this.handlePhotoModalOpen.bind(this, project.screenshots.map(image => `https://media.graphcms.com/${image.file.handle}`))}
                        slug="View Gallery"
                      />
                    </Grid>
                  )
                }

                {
                  !(project.architecturalDiagrams||[]).length ? null : (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <MediaObject 
                        title="Architectural Diagrams"
                        image={project.architecturalDiagrams.map(image => `https://media.graphcms.com/${image.file.handle}`)[0]}
                        description={`Check out architectural diagrams of this project`}
                        onClick={this.handlePhotoModalOpen.bind(this, project.architecturalDiagrams.map(image => `https://media.graphcms.com/${image.file.handle}`))}
                        slug="View Gallery"
                      />
                    </Grid>
                  )
                }
                
              </Grid>
            </Grid>
          </Grid>
        </Section>

      </Layout>
    );
  }
}

ProjectDetailTemplate.propTypes = propTypes;


export default withRoot(withStyles(styles)(ProjectDetailTemplate));

export const ProjectDetailPageQuery = graphql`
  query getProjectById($id: String!) {
    project(id: { eq: $id }) {
      id
      title
      startDate
      projectedLaunchDate
      actualLaunchDate
      compensation
      problemStatement
      solutionStatement
      challengeStatement
      technicalApproach
      projectManagementApproach
      lessonsLearned
      benefits
      pitch
      architecturalDescription
      teamDiscussionVideoUrl
      caseStudyVideoUrl
      public
      position
      briefDescription
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
        industries {
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
          name
          id
          slug
        }
      }
      proficiencies {
        id
        slug
        name
        briefDescription
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
        employee {
          slug
          name
          intro
          id
          title
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
        role {
          id
          slug
          name
        }
      }
      screenshots {
        title
        description
        file {
          id
          handle
          width
          height
        }
      }
      wireframes {
        title
        description
        file {
          id
          handle
          width
          height
        }
      }
      architecturalDiagrams {
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
`;
