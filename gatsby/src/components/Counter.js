import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';
import classNames from 'classnames';

const styles = theme => ({
  gridItem: {
    alignItems: 'flex-start',
    display: 'flex', 
    justifyContent: "flex-start",
  },
  gridItemLast: {
  },
  [theme.breakpoints.up('md')]: {
    gridItem: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRight: '1px solid rgba(0, 0, 0, 0.54)',
    },
    gridItemLast: {
      borderRight: '1px solid transparent',
    },
  },
  text: {
    fontFamily: 'Montserrat,Georgia,"Times New Roman",serif',
    // textShadow: "1px 1px rgba(0, 0, 0, 0.54)"
  }
});

const Counter = (props) => {
  const { start, end, Icon, label, isLast } = props;
  return (
    <div className={isLast ? classNames(props.classes.gridItem, props.classes.gridItemLast) : props.classes.gridItem}>
      <div>
        <Typography
          className={props.classes.text} 
          variant="display3"
        >
            <Icon fill={'rgba(0, 0, 0, 0.54)'} size={40} /> <CountUp start={start} end={end} />
        </Typography>
        <Typography 
          className={props.classes.text}
          variant="display1">{label}</Typography>
      </div>
    </div>
  );
}

Counter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Counter);