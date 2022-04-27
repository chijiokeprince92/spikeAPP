import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../redux/constants/actionTypes';
import { Container, Typography } from "@material-ui/core";
import {
  Bookmark,
  ExitToApp,
  Home,
  Settings,
  Storefront
} from "@material-ui/icons";
import HouseIcon from '@material-ui/icons/House';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import WorkIcon from '@material-ui/icons/Work';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Switch from '@material-ui/core/Switch';

import useStyles from './styles';


const Leftbar = ({mode,setMode}) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  console.log('prince says:', mode)

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  const login = () => {

    history.push('/auth');
  };

  const goHome = () => {
    history.push('/')
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <Container className={classes.container}>
      <div onClick={goHome} className={classes.item}>
        <Home className={classes.icon} />
        <Typography  className={classes.text}>Homepage</Typography>
      </div>
      <div className={classes.item}>
        <ForumIcon className={classes.icon} />
        <Typography className={classes.text}>Chats</Typography>
      </div>
      <div className={classes.item}>
        <PeopleIcon className={classes.icon} />
        <Typography className={classes.text}>Friends</Typography>
      </div>
      <div className={classes.item}>
        <GroupAddIcon className={classes.icon} />
        <Typography className={classes.text}>Groups</Typography>
      </div>
      <div className={classes.item}>
        <HouseIcon className={classes.icon} />
        <Typography className={classes.text}>Find a House</Typography>
      </div>
      <div className={classes.item}>
        <Bookmark className={classes.icon} />
        <Typography className={classes.text}>Bookmarks</Typography>
      </div>
      <div className={classes.item}>
        <MenuBookIcon className={classes.icon} />
        <Typography className={classes.text}>Courses</Typography>
      </div>
      <div className={classes.item}>
        <WorkIcon className={classes.icon} />
        <Typography className={classes.text}>Jobs</Typography>
      </div>
      <div className={classes.item}>
        <Storefront className={classes.icon} />
        <Typography className={classes.text}>Shop Online</Typography>
      </div>
      <div className={classes.item}>
        <Settings className={classes.icon} />
        <Typography className={classes.text}>Settings</Typography>
      </div>
      <div className={classes.item}>
        <Switch className={classes.icon} onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
        <Typography className={classes.text}>Dark Mode</Typography>
      </div>
      {user?.result ? (
          <div className={classes.item} onClick={logout}>
          <ExitToApp className={classes.icon} />
          <Typography className={classes.text}>Logout</Typography>
        </div>
      ) : (
        <div className={classes.item} onClick={login}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Login</Typography>
      </div>
      )}
      
    </Container>
  );
};

export default Leftbar;
