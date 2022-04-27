import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Add from '../Add/Add';
import Posts from '../Posts/Posts';
import useStyles from './styles';
import { getPosts } from '../../redux/actions/posts';

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts())
  
  }, []);

  return (
      <Container className={classes.container}>
          <Posts setCurrentId={setCurrentId} />
          <Add currentId={currentId} setCurrentId={setCurrentId}/>
      </Container>
  );
};

export default Home;