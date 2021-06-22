import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { MenuRoutes } from "./MenuItems";
import { setMenuOpen } from "./store/menu_open/MenuOpenActions";
const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    "& ::-webkit-scrollbar": {
      width: "5px",
    },
    "& ::-webkit-scrollbar-track": {
      background: theme.palette.secondary.light,
    },
    /* Handle */
    "& ::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.light,
    },

    /* Handle on hover */
    "& ::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.primary.dark,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    border: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    border: "none",
    background: theme.palette.background.paper,
    color: theme.palette.secondary.light,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(0) + 1,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  activePage: {
    background: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  activePageOpen: {
    borderRadius: "0 0 25% 0",
  },
  listItem: {
    padding: "0",
  },
  accordion: {
    background: theme.palette.background.paper,
    color: theme.palette.secondary.light,
    boxShadow: "none",
    position: "initial",
  },
  heading: {
    padding: "0 0 0 30px",
  },
  itemsInAccordion: {
    display: "flex",
    flexDirection: "column",
  },
  expanded: {
    "&$expanded": {
      margin: 0,
    },
  },
}));

const SideNav = () => {
  const theme = useTheme();
  const classes = useStyles();
  const state = useSelector((state) => ({
    menuOpen: state.changeMenuOpen.menuOpen,
    currentPage: state.changeCurrentPage.currentPage,
    role: state.loggedInUser.role,
  }));
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    dispatch(setMenuOpen(false));
  };

  const renderMenuElements = (item) => {
    if (item.usersCanSee.includes(state.role)) {
      return (
        <List className={classes.listItem} key={`LIST${item.name}`}>
          <Link
            to={{
              pathname: item.path,
            }}
            className={classes.link}
            id={item.name}
          >
            <ListItem
              button
              key={item.name}
              className={
                state.currentPage === item.path &&
                clsx(classes.activePage, {
                  [classes.activePageOpen]: state.menuOpen,
                })
              }
            >
              <ListItemIcon>{<item.icon />}</ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
              />
            </ListItem>
          </Link>
        </List>
      );
    }
  };
  const renderMenu = () => {
    return MenuRoutes.map((route, i) => {
      if (route.display) {
        if (route.accordion) {
          const routes = route.components
            .map((component) => renderMenuElements(component))
            .filter((route) => route !== undefined);

          return (
            <>
              {routes.length !== 0 ? (
                <>
                  <Accordion
                    classes={{
                      expanded: classes.expanded,
                      root: classes.accordion,
                    }}
                    square={false}
                    defaultExpanded={route.components.some(
                      (route) => route["path"] === state.currentPage
                    )}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <route.icon />
                      <Typography className={classes.heading}>
                        {route.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.itemsInAccordion}>
                      {routes}
                    </AccordionDetails>
                  </Accordion>
                </>
              ) : (
                <></>
              )}
            </>
          );
        } else {
          return (
            <>
              {route.components.map((component) =>
                renderMenuElements(component)
              )}
            </>
          );
        }
      } else {
        return <></>;
      }
    });
  };
  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: state.menuOpen,
          [classes.drawerClose]: !state.menuOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: state.menuOpen,
            [classes.drawerClose]: !state.menuOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        {renderMenu()}
      </Drawer>
    </>
  );
};

export default SideNav;
