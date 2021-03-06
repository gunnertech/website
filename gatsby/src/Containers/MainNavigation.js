import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby";

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import BuildIcon from '@material-ui/icons/Build';
import BusinessIcon from '@material-ui/icons/Business';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import GroupIcon from '@material-ui/icons/Group';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BriefcaseIcon from 'mdi-material-ui/Briefcase'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import StarsIcon from '@material-ui/icons/Stars';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CreateIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';






const drawerWidth = 248;


const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  link: {
    color: theme.palette.secondary.main
  },
  appBar: {
    zIndex: 1400,
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      width: `100%`,
    },
  },
  logo: {
    height: '50px',
    width: 'auto',
    marginTop: `${theme.spacing.unit/2}px`,
    marginLeft: `${theme.spacing.unit}px`
  },
  flex: {
    flex: 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    marginLeft: `-${theme.spacing.unit*2}px`,
    marginRight: `${theme.spacing.unit*3}px`,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      overflowY: 'hidden',
      '&:hover': {
        overflowY: 'auto',
      },
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth
    },
  },
  footer: {
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit*10,
    marginBottom: theme.spacing.unit,
    textAlign: 'center'
  }
});

class MainNavigation extends React.Component {
  state = {
    mobileOpen: false,
    anchorEl: null
  };


  handleChange = (event, checked) =>
    this.setState({ auth: checked });

  handleMenu = event =>
    this.setState({ anchorEl: event.currentTarget });

  handleClose = () =>
    this.setState({ anchorEl: null });

  handleDrawerToggle = () =>
    this.setState({ mobileOpen: !this.state.mobileOpen });



  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const entities = (((this.props.data||{}).entities||[]).edges||[]);


    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List subheader={
          <ListSubheader>Our Clients</ListSubheader>
        }>
          {entities.map(({ node }, i) => (
            <ListItem 
              component={Link} 
              to={`/${node.slug}`} 
              button  
              key={`${node.id}nav`}
              onClick={this.handleDrawerToggle}
            >
              <ListItemIcon>
                {
                  node.slug === 'public-sector' ? (
                    <AccountBalanceIcon />
                  ) : node.slug === 'private-sector' ? (
                    <BriefcaseIcon />
                  ) : (
                    <BuildIcon />
                  )
                }
              </ListItemIcon>
              <ListItemText><Typography  className={classes.link}>{node.name}</Typography></ListItemText>
            </ListItem>
          ))}
            <ListItem 
              component={Link} 
              to={`/industries`} 
              button
              onClick={this.handleDrawerToggle}
            >
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText><Typography className={classes.link}>Industries</Typography></ListItemText>
            </ListItem>
        </List>
        <Divider />
        <List subheader={
          <ListSubheader>About Us</ListSubheader>
        }>
          <ListItem 
            component={Link} 
            to={`/employees`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Employees</Typography></ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to={`/locations`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Locations</Typography></ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to={`/proficiencies`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <WhatshotIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Proficiencies</Typography></ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to={`/certifications`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Certifications</Typography></ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to={`/awards`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Awards</Typography></ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List subheader={
          <ListSubheader>Media Center</ListSubheader>
        }>
          <ListItem 
            component={Link} 
            to={`/posts`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Blog</Typography></ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to={`/articles`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Press</Typography></ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to={`/publications`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Publications</Typography></ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to={`/videos`} 
            button
            onClick={this.handleDrawerToggle}  
          >
            <ListItemIcon>
              <OndemandVideoIcon />
            </ListItemIcon>
            <ListItemText><Typography  className={classes.link}>Tech Show</Typography></ListItemText>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className={classes.flex}>
              <img 
                src={require('../assets/images/nav-logo.png')}
                className={classes.logo}
                alt="Home"
              />
            </Link>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <ContactPhoneIcon />
              </IconButton>
              <Menu
                style={{zIndex: 2000}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}><a href="mailto:contact@gunnertech.com">contact@gunnertech.com</a></MenuItem>
                <MenuItem onClick={this.handleClose}><a href="tel:+1844-846-8338">844-846-8338</a></MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.flex}>
            {this.props.children}
          </div>
          <footer className={classes.footer}>
            <Typography paragraph>
              5348 Vegas Drive <br />
              Las Vegas, NV 89108 <br />
              <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=GS-35F-306GA&amp;contractorName=GUNNER+TECHNOLOGY&amp;executeQuery=YES">GSA: GS-35F-306GA</a> |
              CAGE: 7Q6F5 | 
              DUNS: 078818362 <br />
              © {(new Date()).getFullYear()} Gunner Technology
            </Typography>
          </footer>
        </div>
      </div>
    );
  }
}

MainNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default withStyles(
  styles, 
  { withTheme: true }
)(MainNavigation);
