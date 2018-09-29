import React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";
import { graphql } from "gatsby"


import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


import FullScreenHeader from '../components/FullScreenHeader';
import ScreenSubHeader from '../components/ScreenSubHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
// import EmployeeListItem from '../components/EmployeeListItem';

import Layout from "../components/layout"
import withRoot from '../withRoot';

const styles = theme => ({
  container: {
    backgroundColor: 'white'
  }
});


const propTypes = {
  data: PropTypes.object.isRequired
};

class ProficiencyDetailTemplate extends React.Component {
  render() {
    const { proficiency, proficiencyMarkdown } = this.props.data;
    const { classes } = this.props;
    return !proficiency ? null : (
      <Layout>
        <FullScreenHeader
          logoFallback={proficiency.name.split(" ").map(word => word.substring(0,1)).join("")} 
          logo={proficiency.logo ? `https://media.graphcms.com/${proficiency.logo.file.handle}` : null}
          image={require('../assets/images/proficiencies-banner.jpg')}
          header={ proficiency.name }
          subheader={ proficiency.briefDescription }
        />

        {proficiencyMarkdown.childMarkdownRemark.html && (
          <div
            dangerouslySetInnerHTML={{
              __html: proficiencyMarkdown.childMarkdownRemark.html
            }}
          />
        )}

        {
          !(proficiency.companyLogos||[]).length ? null : (
            <Section>
              <ScreenSubHeader title={`Other Companies Using ${proficiency.name}`} />
              
                  {proficiency.companyLogos.map(companyLogo => (
                    <img 
                      src={`https://media.graphcms.com/resize=h:100/${
                        companyLogo.file.handle
                      }`}
                      key={companyLogo.id}
                      style={{maxHeight: 25, width: 'auto', margin: 24}}
                      alt={companyLogo.title}
                      title={companyLogo.title} 
                    />
                  ))}
                
            </Section>
          )
        }

        <Section>
          <ScreenSubHeader title="Employees" />
          <Grid container spacing={24}>
            {proficiency.employees.map(employee => 
              <Grid key={employee.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
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
                      <Typography variant="body2">{employee.title}</Typography>
                      <Typography paragraph>{employee.intro}</Typography>
                    </div>
                  }
                  url={`/employees/${employee.slug}`}
                  slug="Learn More"
                />
              </Grid>
            )} 
          </Grid>
        </Section>

        {
          !(proficiency.projects||[]).length ? null : (
            <Section>
              <ScreenSubHeader title="Projects" />
              <Grid container spacing={24}>
                {proficiency.projects.map(project => (
                  <Grid key={project.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <MediaObject 
                      title={<Link to={`/projects/${project.id}`}>{project.title}</Link>}
                      image={!project.coverPhoto ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                        project.coverPhoto.file.handle
                      }`}
                      logo={`https://media.graphcms.com/resize=w:300,h:300,a:top,fit:crop/${
                        project.client && project.client.logo && project.client.logo.file.handle
                      }`}
                      description={<span>{<Link to={`/clients/${project.client.slug}`}>{project.client.name}</Link>}: <time>{moment(project.startDate).format('l')}</time> - <time>{moment(project.actualLaunchDate).format('l')}</time></span>}
                      url={`/projects/${project.id}`}
                      slug="Learn More"
                    />
                  </Grid>
                ))}
              </Grid>
            </Section>
          )
        }
        
        

        {
          !(proficiency.links||[]).length ? null : (
            <Section>
              <ScreenSubHeader title="References" />
              
              <Paper elevation={4}>
                <List>
                  {proficiency.links.map(link =>
                    <ListItem key={link.id} divider={link !== proficiency.links.slice(-1).pop()} className={classes.container}>
                      <ListItemText 
                        primary={<a rel="noopener noreferrer nofollow" target="_blank" href={link.url}>{link.name}</a>} 
                      />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="More" href={link.url} rel="noopener noreferrer nofollow" target="_blank">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>  
                  )}  
                </List>
              </Paper>
            </Section>
          )
        }
      </Layout>
    );
  }
}

ProficiencyDetailTemplate.propTypes = propTypes;

export default withRoot(withStyles(styles)(ProficiencyDetailTemplate));

export const ProficiencyDetailPageQuery = graphql`
  query getProficiencyById($id: String!, $mdid: String!) {
    proficiency(id: { eq: $id }) {
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
      links {
        id
        name
        url
      }
      companyLogos {
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
      projects {
        id
        title
        startDate
        projectedLaunchDate
        actualLaunchDate
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
            name
            id
            slug
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
    }
    proficiencyMarkdown(id: { eq: $mdid }) {
      id
      childMarkdownRemark {
        html
      }
    }
  }
`;


// <ListItem key={companyLogo.id} className={classes.container}>
//                       <ListItemAvatar>
//                         <Avatar 
//                           src={`https://media.graphcms.com/resize=h:100,w:100,fit:crop/${
//                             companyLogo.file.handle
//                           }`}
//                           alt={companyLogo.title}
//                           title={companyLogo.title} 
//                         />
//                       </ListItemAvatar>
//                       <ListItemText 
//                         primary={companyLogo.title} 
//                       />
//                     </ListItem>