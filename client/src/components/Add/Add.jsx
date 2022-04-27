import React, { useState, useEffect } from "react";
import {
    Button,
    Container,
    Fab,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Snackbar,
    Typography,
    TextField,
    Tooltip,
  } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory} from 'react-router-dom';

import { createPost, updatePost } from '../../redux/actions/posts';
import { Add as AddIcon } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from './styles';
  

  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const Add = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    console.log('form data:', open)

    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);
  
    const clear = () => {
      setCurrentId(0);
      setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }, history));
  
        clear();
      } else {
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        clear();
      }
    };
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenAlert(false);
    };
    return (
      <>
        <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <Modal open={open}>
          <Container className={classes.container}>
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
              <div className={classes.item}>
                <TextField
                  name="title"
                  id="standard-basic"
                  label="Title"
                  size="small"
                  style={{ width: "100%" }}
                  value={postData.title}
                  onChange={(e) => setPostData({ ...postData, title: e.target.value})}
                />
              </div>
              <div className={classes.item}>
                <TextField
                  name="message"
                  id="outlined-multiline-static"
                  multiline
                  minRows={4}
                  placeholder="Tell your story..."
                  variant="outlined"
                  label="Message"
                  size="small"
                  style={{ width: "100%" }}
                  value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}

                />
              </div>
              <div className={classes.item}>
                <TextField
                  name="tags"
                  id="outlined-multiline-static"
                  multiline
                  minRows={4}
                  placeholder="Place some #Hashtags"
                  variant="outlined"
                  label="Tags (coma separated)"
                  size="small"
                  style={{ width: "100%" }}
                  value={postData.tags}
                  onChange={(e) => setPostData({ ...postData, tags: e.target.value})}
                />
              </div>
              <div className={classes.item}>
                <TextField select label="Visibility" value="Public">
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                  <MenuItem value="Unlisted">Unlisted</MenuItem>
                </TextField>
              </div>
              <div className={classes.item}>
                <FormLabel component="legend">Who can comment?</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    value="Everybody"
                    control={<Radio size="small" />}
                    label="Everybody"
                  />
                  <FormControlLabel
                    value="My Friends"
                    control={<Radio size="small" />}
                    label="My Friends"
                  />
                  <FormControlLabel
                    value="Nobody"
                    control={<Radio size="small" />}
                    label="Nobody"
                  />
                  <FormControlLabel
                    value="Custom"
                    disabled
                    control={<Radio size="small" />}
                    label="Custom (Premium)"
                  />
                </RadioGroup>
              </div>
              <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
              </div>
              <div className={classes.item}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 20 }}
                  onClick={handleSubmit}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Container>
        </Modal>
        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </>
    );
  };
  
  export default Add;
  