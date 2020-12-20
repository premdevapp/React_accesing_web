import React, { Component } from "react";

//import axios from "axios";

import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import Posts from "../Posts/Posts";
//import NewPost from "../NewPost/NewPost";

import asyncComponent from "../../hoc/asyncComponents";

import "./Blog.css";

const AsyncNewPost = asyncComponent(() => {
  return import("../NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true,
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post", //this.props.match.url -> relative path
                    hash: "#submit",
                    search: "?quick-submit-true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" exact component={AsyncNewPost} />
          ) : (
            <Route path="/new-post" render={() => <p>need authentication</p>} />
          )}
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
