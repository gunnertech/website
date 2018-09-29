import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  header: {
    paddingTop: `${theme.spacing.unit * 2}px`,
    paddingBottom: `${theme.spacing.unit}px`
  }
});

const ScreenHeader = props => {
  const { classes, title, children, excludeParagraph } = props;
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <div className={classes.header}>
          <Typography variant="headline">{title}</Typography>
          {children ? excludeParagraph ? children : <Typography paragraph>{children}</Typography> : <div />}
        </div>
      </Grid>
    </Grid>
  );
}

ScreenHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default withStyles(styles)(ScreenHeader);