import React, { Component } from "react";
import { graphql, Link } from "gatsby"

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Search from '@material-ui/icons/Search';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import classNames from 'classnames';

import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import MediaObject from '../components/MediaObject';
import Layout from "../components/layout"
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flex: 1
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 96,
  },
});


class ProficiencyPage extends Component {
  state = {
    searchText: ''
  }

  render() {
    const proficiencies = ((this.props.data.proficiencies||{}).edges||[]);
    const { classes } = this.props;
    
    return !proficiencies ? null : (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/proficiencies-banner.jpg')}
          header={`Our Proficiencies` }
          subheader={`From Bleeding-Edge to Legacy, we've got you covered.`}
          logoFallback={<WhatshotIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Typography paragraph>We are proficient in more than <strong>{proficiencies.length}</strong> different technologies and methodologies.</Typography>
          <Typography paragraph>Below is list - all of which we have used on one ore more production-level project.</Typography>
          <Typography paragraph>There's a lot, so feel free to use the search function to limit the number and be sure to check out more about each, including what other companies are using it.</Typography>
        </Section>

        <Section>
          <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-search">Search</InputLabel>
            <Input
              id="adornment-search"
              type={'search'}
              value={this.state.searchText}
              onChange={event => this.setState({searchText: event.target.value})}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid container spacing={24}>
            {proficiencies.filter(({node}) => !this.state.searchText || node.name.toLowerCase().match(this.state.searchText.toLowerCase()) ).sort((a,b) => a.node.name.toLowerCase() > b.node.name.toLowerCase() ? 1 : -1).map(({node}) => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/proficiencies/${node.slug}`}>{node.name}</Link>}
                  image={node.coverPhoto ? (
                      `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${node.coverPhoto.file.handle}`
                    ) : node.logo ? (
                      `https://media.graphcms.com/${node.logo.file.handle}`
                    ) : (
                      require('../assets/images/proficiencies-banner.jpg')
                    )
                  }
                  logo={!node.logo ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    node.logo.file.handle
                  }`}
                  logoFallback={
                    node.name.split(" ").map(word => word.substring(0,1).toUpperCase()).slice(0,2).join("")
                  }
                  description={node.briefDescription}
                  url={`/proficiencies/${node.slug}`}
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

export default withRoot(withStyles(styles)(ProficiencyPage));

export const ProficiencyPageQuery = graphql`
  query getAllProficiencys {
    proficiencies: allProficiency(
      sort: { fields: [name], order: ASC}
    ) {
      edges {
        node {
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
      }
    }
  }
`;
