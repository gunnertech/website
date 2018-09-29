import React from "react";
import * as PropTypes from "prop-types";
import { graphql, Link } from "gatsby"

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';



import FullScreenHeader from '../components/FullScreenHeader';
import ScreenSubHeader from '../components/ScreenSubHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
// import EmployeeListItem from '../components/EmployeeListItem';
import Layout from "../components/layout"
import withRoot from '../withRoot';

const propTypes = {
  data: PropTypes.object.isRequired
};

class CertificationDetailTemplate extends React.Component {
  render() {
    const { certification } = this.props.data;
    return !certification ? null : (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/certifications.png')}
          header={ certification.name }
          subheader={ `` }
          logo={`https://media.graphcms.com/${certification.media.file.handle}`}
        />

        {certification.description.split("\n").map((line, i) => 
          <Typography key={`briefDescription-${i}`} gutterBottom paragraph>{line}</Typography>
        )}

        <Section>
          <ScreenSubHeader title="Employees" />
          <Grid container spacing={24}>
            {certification.employees.map(employee => 
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

      </Layout>
    );
  }
}

CertificationDetailTemplate.propTypes = propTypes;

export default withRoot(CertificationDetailTemplate);

export const CertificationDetailPageQuery = graphql`
  query getCertificationById($id: String!) {
    certification(id: { eq: $id }) {
      id
      name
      description
      awardedOn
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
    }
  }
`;
