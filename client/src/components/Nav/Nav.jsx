import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { getPostsBySearch } from '../../redux/actions/posts';
import Button from "@material-ui/core/Button";

import useStyles from './styles';
import {AppBar, Avatar, Badge, InputBase, Toolbar, Typography } from "@material-ui/core";
import { Cancel, Mail, Notifications, Search } from "@material-ui/icons";
  
  
  
  const Nav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
      if (search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        history.push('/');
      }
    };

    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        searchPost();
      }
    };

    useEffect(() => {
      const token = user?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
      
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
      <AppBar style={{backgroundColor: "pink"}} position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logoLg}>
            GIFTY APP
          </Typography>
          <Typography variant="h6" className={classes.logoSm}>
            GIFTY
          </Typography>
          <div className={classes.search}>
            <Search />
            <InputBase onKeyDown={handleKeyPress} name="search"
              value={search} 
              onChange={(e) => setSearch(e.target.value)} variant="outlined" placeholder="Search..." className={classes.input} />
            <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
          </div>
          {user?.result ? (
       <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              onClick={() => setOpen(true)}
            />
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge>
            <Avatar style={{backgroundColor: 'lightblue'}}className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
          </div>
      ) : (
        <Avatar>?</Avatar>
      )}  
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Nav;
  