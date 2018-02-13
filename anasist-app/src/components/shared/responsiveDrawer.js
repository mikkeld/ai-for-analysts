/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import CloudDoneIcon from 'material-ui-icons/CloudDone';
import InsertEmotionIcon from 'material-ui-icons/InsertEmoticon';
import Button from 'material-ui/Button';
import HomeIcon from 'material-ui-icons/Home';
import {
  Link,
  NavLink
} from 'react-router-dom';
import logo from '../../media/logo.png';

const logoPath = 'https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/logo_edward_moore_clean.png?alt=media&token=d609c491-a185-4375-b3c3-08a3dad30655';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    overflowX: 'auto',
    overflowY: 'visible',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  subLink: {
    textDecoration: 'none'
  },
  text: {
    color: theme.palette.primary.A400,
    fontWeight: 'bold'
  },
  flex: {
    flex: 1,
  },

});

const CustomNavLink = (props) => (
  <NavLink  className={props.classes.subLink} to={{ pathname: props.to }}>
    <ListItem button className={props.classes.nested}>
      <ListItemText classes={props.pathname.includes(props.to) ? {text: props.classes.text} : null}
                    inset
                    primary={props.displayName} />
    </ListItem>
  </NavLink>
);

class ResponsiveDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileOpen: false,
      adminOpen: true,
      jobsOpen: false,
      reportsOpen: false,
      activePath: "/admin"
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleClick = state => {
    if(state === "admin") {
      this.setState({adminOpen: !this.state.adminOpen})
    } else if (state === "jobs") {
      this.setState({jobsOpen: !this.state.jobsOpen})
    } else if (state === "reports") {
      this.setState({reportsOpen: !this.state.reportsOpen})
    } else {
      console.log("unknown link group")
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <img src={logo} style={{width:'60%', marginLeft:20, marginTop: 20}}/>
        </div>
        <Divider />
        <List className={classes.root}>
          <Link className={classes.subLink} to={{ pathname: "/" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText classes={this.props.location.pathname === '/' ? {text: classes.text} : null} inset primary="Home" />
            </ListItem>
          </Link>
          <Link className={classes.subLink} to={{ pathname: "/models" }}>
            <ListItem button>
              <ListItemIcon>
                <CloudDoneIcon />
              </ListItemIcon>
              <ListItemText classes={this.props.location.pathname.includes('/models') ? {text: classes.text} : null} inset primary="Models" />
            </ListItem>
          </Link>
          <Link className={classes.subLink} to={{ pathname: "/samples" }}>
            <ListItem button>
              <ListItemIcon>
                <InsertEmotionIcon />
              </ListItemIcon>
              <ListItemText classes={this.props.location.pathname.includes("/samples") ? {text: classes.text} : null} inset primary="Samples" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap className={classes.flex}>
                {this.props.componentTitle}
              </Typography>
              {this.props.user ?
                <Button color="contrast" onClick={this.props.handleLogout}>Logout</Button>
                :
                <Button color="contrast" onClick={this.props.handleLogin}>Login</Button>
              }

            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="permanent"
              open
              style={{height: '100vh'}}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <Typography type="body1" noWrap>
            </Typography>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);