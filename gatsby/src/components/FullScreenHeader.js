import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { Helmet } from "react-helmet";

import ReactDOMServer from 'react-dom/server';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'

const avatarSize = 85;

const styles = theme => ({
  container: {
    marginLeft: theme.spacing.unit*-3,
    marginRight: theme.spacing.unit*-3,
    marginTop: theme.spacing.unit*-3,
    marginBottom: theme.spacing.unit*3,
    overflow: 'visible'
  },
  containerWithAvatar: {
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit*9,
    }
  },
  media: {
    height: 300
  },
  content: {
    backgroundColor: 'rgba(0,0,0,.5)',
    height: 300,
    marginTop: -300,
    position: 'relative',
  },
  text: {
    color: 'white',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    // paddingRight: theme.spacing.unit*3,
  },
  avatar: {
    color: theme.palette.primary.main,
    fontSize: 96,
    margin: "auto",
    border: '2px solid white',
    height: avatarSize * 2,
    width: avatarSize * 2,
    // 
    backgroundColor: 'white',
    // bottom: 20,
    
    [theme.breakpoints.up('md')]: {
      // top: 300,
      position: 'absolute',
      border: '5px solid white',
      height: avatarSize * 2,
      width: avatarSize * 2,
      bottom: avatarSize * 2 / -3,
      left: theme.spacing.unit*3,
      top: 'initial'
    },
  },
  withAvatar: {
    paddingTop: theme.spacing.unit*3,
    // paddingLeft: theme.spacing.unit + avatarSize/2,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit*3 + avatarSize*2,
      paddingTop: 0
    },
  }
});

const FullScreenHeader = props => {
  const { classes, image, logo, logoFallback, avatarClass } = props;
  return (
    <div>
      <Helmet>
        <title>{props.header} | Gunner Technology</title>
        {
          props.subheader && typeof props.subheader === 'string' ? (    
            <meta name="description" content={props.subheader} />
          ) : props.subheader ? (
            <meta name="description" content={ReactDOMServer.renderToStaticMarkup(props.subheader).replace(/<\/?[^>]+(>|$)/g,'')} />
          ) : (
            null
          )
        }

        {
          props.subheader && typeof props.subheader === 'string' ? (    
            <meta property="og:description" content={props.subheader} />
          ) : props.subheader ? (
            <meta property="og:description" content={ReactDOMServer.renderToStaticMarkup(props.subheader).replace(/<\/?[^>]+(>|$)/g,'')} />
          ) : (
            null
          )
        }

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${props.header} - Gunner Technology`} />
        
        <meta property="og:image" content={image} />
        <meta property="og:image:url" content={image} />
      </Helmet>
      <Card
        className={logo || logoFallback ? classNames(classes.container, classes.containerWithAvatar) : classes.container }
      >
        <CardMedia
          image={image}
          title={props.header}
          className={classes.media}
        />
        <CardContent
          className={classes.content}
        >
          {
            logo ? (
            <Avatar alt={props.header} src={logo} className={classes.avatar} />
          ) : logoFallback ? (
            <Avatar className={avatarClass ? classNames(classes.avatar, avatarClass) : classes.avatar}>{logoFallback}</Avatar>
          ) : (
            null
          )}
          <div className={logo || logoFallback ? classNames(classes.textContainer, classes.withAvatar) : classes.textContainer }>
            <Typography className={classes.text} gutterBottom variant="display2">
              {props.header}
            </Typography>
            <Typography className={classes.text} variant="subheading">
              {props.subheader}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

FullScreenHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenHeader);