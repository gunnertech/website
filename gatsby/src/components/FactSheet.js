import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby";
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  table: {
    minWidth: 300,
  },
  row: {
    padding: theme.spacing.unit * 2
  }
});

const FactSheet = (props) => {
  const { classes, project } = props;
  const { client } = project;
  return (
    <Paper className={classes.root}>
      <Grid container className={classes.row}>
        <Grid item xs={3} sm={2}>Client:</Grid>
        <Grid item><Link to={`/clients/${client.slug}`}>{client.name}</Link></Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.row}>
        <Grid item xs={3} sm={2}>Industries:</Grid>
        <Grid item>
          {
            client.industries.map((industry, i) => <span key={industry.id}>
              {i > 0 ? ', ' : ''}
              <Link to={`/industries/${industry.slug}`}>{industry.name}</Link>
            </span>)
          }
        </Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.row}>
        <Grid item xs={3} sm={2}>Est Launch Date:</Grid>
        <Grid item>{moment(project.projectedLaunchDate).format('l')}</Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.row}>
        <Grid item xs={3} sm={2}>Start Date:</Grid>
        <Grid item>{moment(project.startDate).format('l')}</Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.row}>
        <Grid item xs={3} sm={2}>Launch Date:</Grid>
        <Grid item>{moment(project.actualLaunchDate).format('l')}</Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.row}>
        <Grid item xs={3} sm={2}>Compensation:</Grid>
        <Grid item>{project.compensation}</Grid>
      </Grid>
    </Paper>
  );
}


FactSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FactSheet);