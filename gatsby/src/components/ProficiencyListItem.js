import React from 'react';
import { Link } from "gatsby";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  container: {
    paddingLeft: 0
  }
});

const ProficiencyListItem = props => {
  const { classes, proficiency } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <List>      
          <ListItem className={classes.container}>
            {
              proficiency.logo  && proficiency.logo.file ? (
                <ListItemAvatar>
                  <Avatar src={`https://media.graphcms.com/${proficiency.logo.file.handle}`} alt={proficiency.name} />
                </ListItemAvatar>
              ) : (
                <ListItemAvatar>
                  <Avatar>{proficiency.name.split(" ").map(word => word.substring(0,1)).join("")}</Avatar>
                </ListItemAvatar>
              )
            }
            
            <ListItemText
              primary={<Link to={`/proficiencies/${proficiency.slug}`}>{proficiency.name}</Link>}
            />
          </ListItem>
        </List>    
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Typography paragraph>{proficiency.briefDescription}</Typography>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" color="primary" component={Link} to={`/proficiencies/${proficiency.slug}`}>
          Learn More
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

ProficiencyListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProficiencyListItem);