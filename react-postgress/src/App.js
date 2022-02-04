import React from "react";
import User from "./user/User";
import { Menu } from "antd";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import LoginInfo from "./loginInfo/LoginInfo";
import Address from "./address/Address";

function App() {
  return (
    <div>
      <Menu
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          bottom: "0",
          width: "256px",
        }}
        defaultSelectedKeys={["1"]}
        mode="inline"
      >
        <Menu.Item key="1">
          <Link to="/user">User</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/logininfo">Login Info</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/address">Address</Link>
        </Menu.Item>
      </Menu>
      <div style={{ marginLeft: "300px" }}>
        <Switch>
          <Route exact path="/user">
            <User />
          </Route>
          <Route exact path="/logininfo">
            <LoginInfo />
          </Route>
          <Route exact path="/address">
            <Address />
          </Route>
          <Route path="/">
            <Redirect to="/user" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
