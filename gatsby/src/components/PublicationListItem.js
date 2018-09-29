import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  container: {
    paddingLeft: 0
  }
});

const PublicationListItem = props => {
  const { classes, publication } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <List>
          <ListItem className={classes.container}>
            {
              publication.thumbnail ? (
                <ListItemAvatar>
                  <Avatar src={`https://media.graphcms.com/${publication.thumbnail.file.handle}`} alt={publication.name} />
                </ListItemAvatar>
              ) : (
                <ListItemIcon>
                  <WhatshotIcon />
                </ListItemIcon>
              )
            }
            
            <ListItemText
              primary={publication.name}
              secondary={<span>Published <time>{moment(publication.publishedOn).format('l')}</time></span>}
            />
          </ListItem>
        </List>    
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div>
          <Typography paragraph>
            {publication.description}
          </Typography>
          <Typography variant="subheading">
            Available On:
          </Typography>
          <List>
            {publication.links.map(link =>
              <ListItem key={link.id}>
                <ListItemText
                  primary={<a rel="noopener noreferrer nofollow" target="_blank" href={link.url}>{link.name}</a>}
                />
              </ListItem>
            )}
          </List>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

PublicationListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicationListItem);