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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
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

const EmployeeListLitem = props => {
  const { classes, employee, role } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <List>
          <ListItem className={classes.container}>
            <ListItemAvatar>
              <Avatar src={employee.thumbnail ? `https://media.graphcms.com/${employee.thumbnail.file.handle}` : ""} alt={employee.name} />
            </ListItemAvatar>
            <ListItemText
              primary={<Link to={`/employees/${employee.slug}`}>{employee.name}</Link>}
              secondary={<span>
                {role ? null : employee.title}
                {
                  role ? (
                    <Link to={`/roles/${role.slug}`}>{role.name}</Link>
                  ) : (
                    null
                  )
                }
              </span>}
            />
          </ListItem>
        </List>    
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Typography paragraph>{employee.intro}</Typography>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" color="primary" component={Link} to={`/employees/${employee.slug}`}>
          Learn More
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

EmployeeListLitem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeListLitem);