import React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";
import { graphql } from "gatsby"

// import moment from 'moment';

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

class IndustryDetailTemplate extends React.Component {
  render() {
    const { industry, industryMarkdown } = this.props.data;
    return !industry ? null : (
      <Layout>
        <FullScreenHeader 
          image={`https://media.graphcms.com/${industry.photo.file.handle}`}
          logo={`https://media.graphcms.com/${industry.thumbnail.file.handle}`}
          header={industry.name}
          subheader={industry.description}
        />
        {industryMarkdown.childMarkdownRemark.html && (
          <div
            dangerouslySetInnerHTML={{
              __html: industryMarkdown.childMarkdownRemark.html
            }}
          />
        )}

        <Section>
          <ScreenSubHeader title="Clients" />
          <Grid container spacing={24}>
            {industry.clients.map((client, i) => (
              <Grid key={client.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/clients/${client.slug}`}>{client.name}</Link>}
                  image={client.logo && client.logo.file && `https://media.graphcms.com/resize=h:400,a:top,fit:scale/${
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
              </Grid>
            ))}
          </Grid>
        </Section>
      </Layout>
    );
  }
}

IndustryDetailTemplate.propTypes = propTypes;

export default withRoot(IndustryDetailTemplate);

export const IndustryDetailPageQuery = graphql`
  query getIndustryById($id: String!, $mdid: String!) {
    industry(id: { eq: $id }) {
      id
      slug
      name
      description
      pitch
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
    industryMarkdown(id: { eq: $mdid }) {
      id
      childMarkdownRemark {
        html
      }
    }
  }
`;
