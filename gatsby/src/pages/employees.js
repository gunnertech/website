import React, { Component } from "react";
import { graphql, Link } from "gatsby"

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';

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

class EmployeePage extends Component {
  render() {
    const employees = ((this.props.data.employees||{}).edges||[]);
    const { classes } = this.props;
    return (
      <Layout>
        <FullScreenHeader 
          header={`Our Team` }
          subheader={`We are a cross-functional team of engineers, developers, designers, analysts and project managers.`}
          image={require('../assets/images/gunner-banner.jpg')}
          logoFallback={<GroupIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        
        <Section>
          <Grid container spacing={24}>
            {employees.map(({ node }) => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/employees/${node.slug}`}>{node.name}</Link>}
                  image={!node.coverPhoto ? (
                    require('../assets/images/gunner-banner.jpg')
                    ) : (
                      `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${node.coverPhoto.file.handle}`
                    )
                  }
                  logo={!node.thumbnail ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    node.thumbnail.file.handle
                  }`}
                  logoFallback={
                    node.name.split(" ").map(word => word.substring(0,1).toUpperCase()).slice(0,2).join("")
                  }
                  description={
                    <div>
                      <Typography variant="body2">{node.title}</Typography>
                      <Typography paragraph>{node.intro}</Typography>
                    </div>
                  }
                  url={`/employees/${node.slug}`}
                  slug="Learn More"
                />
              </Grid>
            )} 
          </Grid>
        </Section>

      </Layout>
    );
  }
}

export default withRoot(withRoot(withStyles(styles)(EmployeePage)));

export const EmployeePageQuery = graphql`
  query getAllEmployees {
    employees: allEmployee(
      sort: { fields: [position], order: ASC}
    ) {
      edges {
        node {
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
