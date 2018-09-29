import React, { Component } from "react";
import { graphql } from "gatsby"

import moment from 'moment';
import StarsIcon from '@material-ui/icons/Stars';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Trophy from 'react-mdi-props/icons/trophy';

import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import Layout from "../components/layout"
import MediaObject from '../components/MediaObject';
import withRoot from '../withRoot';

const styles = theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 96,
  },
});
class AwardPage extends Component {
  render() {
    const awards = ((this.props.data.awards||{}).edges||[]);
    const { classes } = this.props;
    return (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/awards.jpg')}
          header={`Our Awards` }
          subheader={`We have the hardware to prove it.`}
          logoFallback={<StarsIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Typography paragraph>Over the years, we have been honored to receive awards from various publications and instutions.</Typography>
          <Typography paragraph>We take great pride in displaying these awards as they speak to our dedication to our clients.</Typography>
        </Section>

        <Section>
          <Grid container spacing={24}>
            {awards.map(({ node }) => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={node.name}
                  image={node.coverPhoto ? (
                      `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${node.coverPhoto.file.handle}`
                    ) : node.media ? (
                      `https://media.graphcms.com/${node.media.file.handle}`
                    ) : (
                      require('../assets/images/awards.jpg')
                    )
                  }
                  logo={!node.media ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    node.media.file.handle
                  }`}
                  logoFallback={
                    <Trophy
                      fill={`white`}
                      size={64}
                    />
                  }
                  description={moment(node.awardedOn).format('l')}
                  url={``}
                  slug={``}
                />
              </Grid>
            )}
          </Grid>
        </Section>
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(AwardPage));

export const AwardPageQuery = graphql`
  query getAllAwards {
    awards: allAward(sort: { fields: [awardedOn], order: DESC}) {
      edges {
        node {
          id
          name
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
        }
      }
    }
  }
`;







// <Paper elevation={1}>
//   <List>
//     {awards.map(({node}) =>
//       <ListItem key={node.id}>
//         <ListItemAvatar>
//           <Avatar alt={node.name} src={`https://media.graphcms.com/${node.media.file.handle}`} />
//         </ListItemAvatar>
//         <ListItemText 
//           primary={node.name} 
//           secondary={moment(node.awardedOn).format('l')}
//         />
//       </ListItem>  
//     )}  
//   </List>
// </Paper>


// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Avatar from '@material-ui/core/Avatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Paper from '@material-ui/core/Paper';
