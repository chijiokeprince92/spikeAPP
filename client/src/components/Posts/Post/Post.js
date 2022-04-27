import React, { useState } from 'react';
import {Card,CardHeader, CardMedia, CardContent,CardActions, Avatar, IconButton,Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../redux/actions/posts';
import useStyles from './styles';


const Post = ({ post, setCurrentId}) => {
  //post function
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Favourite = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><FavoriteIcon fontSize="small" style={{color: 'red'}} /><span style={{fontSize: 'medium'}}>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</span></>
        ) : (
          <><FavoriteBorderOutlinedIcon style={{ color: 'red'}} fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}<span style={{fontSize: 'medium'}}></span></>
        );
    }

    return <><FavoriteBorderOutlinedIcon fontSize="small" /><span style={{fontSize: 'medium'}}>&nbsp;Like</span></>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };
//End of post function

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            R
          </Avatar>
        }
        action={
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <IconButton name="edit" aria-label="edit"  onClick={(e) => {e.stopPropagation(); setCurrentId(post._id); console.log("prince id: ",post._id);
          }}>
            <MoreVertIcon />
          </IconButton>
          )
          }
        title={post.title}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        onClick={openPost}
        className={classes.media}
        image={post.selectedFile || "/static/images/cards/paella.jpg"}
        title={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Like this post" disabled={!user?.result} onClick={handleLike}>
          <Favourite />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <IconButton aria-label="delete" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp;
          </IconButton>
        )}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
