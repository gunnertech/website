import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing.unit * 4,
  },
  splitContainer: {
    marginBottom: theme.spacing.unit * 10,
  },
  fullScreenContainer: {
    marginLeft: theme.spacing.unit * -4,
    marginRight: theme.spacing.unit * -4
  }
});

const Section = props => {
  const { children, classes, fullWidth, split } = props;
  return (
    <section 
      className={
        fullWidth ? (
          classNames(classes.container, classes.fullScreenContainer)
        ) : split ? (
          classNames(classes.container, classes.splitContainer)
        ) : (
          classes.container
        )
      }>
      {children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
};

export default withStyles(styles)(Section);