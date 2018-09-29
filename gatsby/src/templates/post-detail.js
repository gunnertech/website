import React from "react";
import * as PropTypes from "prop-types";
import { graphql } from "gatsby"

import Paper from '@material-ui/core/Paper';

import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';

import Layout from "../components/layout"
import withRoot from '../withRoot';

const propTypes = {
  data: PropTypes.object.isRequired
};

class PostDetailTemplate extends React.Component {
  render() {
    const { wordpressPost } = this.props.data;
    return !wordpressPost ? null : (
      <Layout>
        <FullScreenHeader 
          image={((((wordpressPost.featured_media||{}).localFile||{}).childImageSharp||{}).sizes||{}).src}
          header={ wordpressPost.title.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&') }
          subheader={ `Published ${wordpressPost.date}` }
        />

        <Section>
          <Paper elevation={4} style={{padding: 16}}>
            <div dangerouslySetInnerHTML={{ __html: wordpressPost.content }} />  
          </Paper>
        </Section>

      </Layout>
    );
  }
}

PostDetailTemplate.propTypes = propTypes;

export default withRoot(PostDetailTemplate);

export const pageQuery = graphql`
query getWordpressPostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      slug
      title
      content
      excerpt
      modified
      date( formatString: "MM/DD/YYYY" )
      featured_media {
        localFile {
          childImageSharp {
            sizes( maxWidth: 2000 ) {
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
      template
      status
    }
  }
`