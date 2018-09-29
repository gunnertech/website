import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Section from './Section';

const styles = theme => ({
  item: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
});

const SplitSection = props => {
  const { classes, title, content, force } = props;
  return (
    <Section split>
      <Grid container spacing={24}>
        <Grid className={classes.item} item xs={12} sm={12} md={12} lg={force ? 2 : 12} xl={force ? 2 : 12}>
          {title}
        </Grid>
        <Grid item className={classes.item} xs={12} sm={12} md={12} lg={force ? 10 : 12} xl={force ? 10 : 12}>
          {content}
        </Grid>
      </Grid>
    </Section>
  );
}

SplitSection.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.element,
  content: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default withStyles(styles)(SplitSection);