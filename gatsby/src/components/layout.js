import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby"
import { Location } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';

import MainNavigation from '../Containers/MainNavigation';
import Container from './Container';
import withRoot from '../withRoot';



const styles = theme => ({
  '@global': {
    '.embed-youtube iframe': {
      'max-width': '100%'
    },
    'a': {
      'color': theme.palette.secondary.main,
      'text-decoration': 'none'
    },
    'p': {
      'color': 'rgba(0, 0, 0, 0.87)',
      'font-size': '1.125rem',
      'font-weight': 400,
      'font-family': '"Roboto", "Helvetica", "Arial", sans-serif',
      'line-height': '1.46429em'
    },
    'p > img': {
      maxWidth: "100%",
      height: "auto"
    },
    '*': {
      'font-family': '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  },
  [theme.breakpoints.up('md')]: {
    '@global': {
      'body': {
        // 'overflowY': 'hidden'
      }
    },
  },
});


const TemplateWrapper = props =>
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        entities: allEntity {
          edges {
            node {
              id
              slug
              name
              description
            }
          }
        }
      }
    `}
    render={data => <TemplateWithStyles data={data}>{props.children}</TemplateWithStyles>}
  />
  

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

const Template = props => 
  <Location>
    {({ navigate, location }) => 
      <Container>
        <Helmet
          encodeSpecialCharacters={true}
          title="Gunner Technology"
          meta={[
            { name: `description`, content: `Gunner Technology is a software development firm that builds JavaScript solutions on AWS for the public and private sectors as well as entrepreneurs.` },
            { name: `keywords`, content: `javascript, react, aws` },
            { name: 'og:url', content: `https://gunnertech.com${location.pathname}` }
          ]}
        />
        <MainNavigation data={ props.data }>
          {props.children}
        </MainNavigation>
      </Container>
    }
  </Location>
  

const TemplateWithStyles = withRoot(withStyles(styles)(Template));

export default TemplateWrapper;