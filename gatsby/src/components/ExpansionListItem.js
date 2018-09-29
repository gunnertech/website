import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  container: {
    paddingLeft: 0
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  }
});

const ExpansionListItem = props => {
  const { classes, title, body, iconSrc, iconText } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <List>
          <ListItem className={classes.container}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={iconSrc}>{iconSrc ? null : iconText}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={title}
            />
          </ListItem>
        </List>    
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {body}
      </ExpansionPanelDetails>
      <Divider />
    </ExpansionPanel>
  );
}

ExpansionListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionListItem);