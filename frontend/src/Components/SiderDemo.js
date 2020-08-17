import React, { Component } from "react";

import { Layout, Menu, Icon } from "antd";

import Login from "./Login";
import Logout from "./Logout";
import Visitorpage from "./Visitorpage";
import Register from "./Register";
import Delivery from "./Delivery";
// import About from "./About";
const { Header, Content, Footer, Sider } = Layout;

class sider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedkey: "1"
    };
  }
  handleChange = e => {
    this.setState(
      {
        selectedkey: e.key
      },
      console.log(this.state, e)
    );
  };
  render() {
    let page;
    switch (this.state.selectedkey) {
      // case "0":
      //   page = <About />;
      //   break;
      case "1":
        page = <Register />;
        break;
      case "2":
        page = <Login />;
        break;
      case "3":
        page = <Logout />;
        break;
      case "4":
        page = <Visitorpage />;
        break;
      case "5":
        page = <Delivery />;
        break;
      default:
        page = <div />;
        break;
    }

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={this.handleChange}
            defaultSelectedKeys={[this.state.selectedkey]}
          >
            {/* <Menu.Item key="0">
              <span className="Introduction"> About </span>{" "}
            </Menu.Item>{" "} */}
            <Menu.Item key="1">
              <Icon type="User" />
              <span className="Register"> REGISTER </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="User" />
              <span className="Login"> LOGIN </span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="User" />
              <span className="Logout"> LOGOUT </span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="User" />
              <span className="Visitorpage"> VISITOR </span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="User" />
              <span className="Delivery"> DELIVERY </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{ background: "#fff", padding: 0, textAlign: "center" }}
          >
            VISITOR AND STAFF MANAGEMENT SYSTEM
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {page}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            V&SM© 2019 Created by NidhiFathima
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default sider;
