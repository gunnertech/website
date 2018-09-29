import React, { Component } from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby"

import { withStyles } from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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


class CertificationPage extends Component {
  render() {
    const certifications = ((this.props.data.certifications||{}).edges||[]);
    const { classes } = this.props;
    return (
      <Layout>
        <FullScreenHeader 
          image={require('../assets/images/certifications.png')}
          header={`Our Certifications` }
          subheader={`Rest assured: We know what we're doing.`}
          logoFallback={<VerifiedUserIcon className={classes.avatar} />}
          avatarClass={classes.avatar}
        />

        <Section>
          <Typography paragraph>We are constantly striving for improvement.</Typography>
          <Typography paragraph>Part of that commitment means ongoing education from trusted third parties.</Typography>
          <Typography paragraph>Below is a list of certifications our employees have earned.</Typography>
          <Typography paragraph>To read more about the certification, including who at Gunner holds it, click "Learn More" below.</Typography>
        </Section>

        <Section>
          <Grid container spacing={24}>
            {certifications.map(({ node }) => 
              <Grid key={node.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/certifications/${node.id}`}>{node.name}</Link>}
                  image={node.coverPhoto ? (
                      `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${node.coverPhoto.file.handle}`
                    ) : node.media ? (
                      `https://media.graphcms.com/${node.media.file.handle}`
                    ) : (
                      require('../assets/images/certifications.png')
                    )
                  }
                  logo={!node.media ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    node.media.file.handle
                  }`}
                  logoFallback={
                    node.name.split(" ").map(word => word.substring(0,1).toUpperCase()).slice(0,2).join("")
                  }
                  description={node.briefDescription}
                  url={`/certifications/${node.id}`}
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

export default withRoot(withStyles(styles)(CertificationPage));

export const CertificationPageQuery = graphql`
  query getAllCertifications {
    certifications: allCertification {
      edges {
        node {
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
          }
        }
      }
    }
  }
`;




// import Paper from '@material-ui/core/Paper';
// import Avatar from '@material-ui/core/Avatar';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import IconButton from '@material-ui/core/IconButton';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';




// <Paper elevation={1}>
//             <List>
//               {certifications.map(({ node }) => 
//                 <ListItem divider key={node.id}>
//                   <ListItemAvatar>
//                     <Avatar alt={node.name} src={`https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
//                       node.media.file.handle
//                     }`} />
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary={<Link to={`/certifications/${node.id}`}>{node.name}</Link>} 
//                     secondary={``}
//                   />
//                   <ListItemSecondaryAction>
//                     <IconButton aria-label="More" component={Link} to={`/certifications/${node.id}`}>
//                       <ArrowForwardIosIcon />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>  
//               )}  
//             </List>
//           </Paper>