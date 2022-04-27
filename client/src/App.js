import React, { useState } from "react";
import { Grid, makeStyles,Box } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Profile from './components/Profile/Profile';
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const App = () => {
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
      <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={'background.default'} color={"text.primary"}>
          <Nav />
          <Grid container>
            <Grid item sm={2} xs={2}>
              <Leftbar setMode={setMode} mode={mode} />
            </Grid>
            <Grid item sm={7} xs={10}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => <Redirect to="/posts" />}
                />
                <Route path="/posts" exact component={Home} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" exact component={PostDetails} />
                <Route
                  path={["/creators/:name", "/tags/:name"]}
                  component={CreatorOrTag}
                />
                <Route
                  path="/auth"
                  exact
                  component={() =>
                    !user ? <Auth /> : <Redirect to="/posts" />
                  }
                />
              </Switch>
            </Grid>
            <Grid item sm={3} className={classes.right}>
              <Rightbar />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
