import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from "gatsby";

const avatarSize = 50;

const styles = theme => ({
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  content: {
    position: 'relative',
  },
  contentWithAvatar: {
    paddingTop: avatarSize,
  },
  card: {
    maxWidth: 800,
  },
  media: {
    height: 200,
    objectFit: 'contain',
  },
  avatar: {
    border: '5px solid white',
    height: avatarSize * 2,
    width: avatarSize * 2,
    position: 'absolute',
    backgroundColor: 'white',
    fontSize: 48,
    top: avatarSize * -1,
    
    // [theme.breakpoints.up('md')]: {
    //   border: '5px solid white',
    //   height: avatarSize * 2,
    //   width: avatarSize * 2,
    // },
  },
  fallbackAvatar: {
    backgroundColor: theme.palette.primary.main
  }
});

const Project = (props) => {
  const { classes, title, image, description, url, onClick, slug, logo, logoFallback, external } = props;
  return (
    <div>
      <Card className={classes.card}>
        {
          image && 
          <CardMedia
            className={classes.media}
            image={image}
            title={title}
          />
        }
        
        <CardContent
          className={logo || logoFallback ? classNames(classes.content, classes.contentWithAvatar) : classes.content }
        >
          {
            logo ? (
              <Avatar 
                src={logo} 
                alt={title.toString()} 
                className={classes.avatar}
              />
            ) : logoFallback ? (
              <Avatar className={classNames(classes.avatar, classes.fallbackAvatar)}>{logoFallback}</Avatar>
            ) : (
              null
            )
          }
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          {typeof description === 'string' && description ? (
            <Typography component="p">
              {description}
            </Typography>
          ) : (
            description
          )}
        </CardContent>
        <CardActions>
        {
          url ? (
            external ? (
              <Button size="small" color="primary">
                <a rel="noopener noreferrer nofollow" target="_blank" href={url}>{slug}</a>
              </Button>
            ) : (
              <Button size="small" color="primary" component={Link} to={url}>
                {slug}
              </Button>
            )
          ) : onClick ? ( 
            <Button size="small" color="primary" onClick={onClick.bind(null)}>
              {slug}
            </Button>
          ) : (
            null
          )
        }
        </CardActions>
      </Card>
    </div>
  );
}

Project.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Project);