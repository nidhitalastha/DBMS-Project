import React, { Component } from "react";
import "./login.css";

import { Card, Form, Icon, Input, Button, Modal, Select } from "antd";
function success() {
  Modal.success({
    content: "You have loggedout successfully!!"
  });
}

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedout: false,
      showModal: false,
      details: []
    };

    localStorage.removeItem("Security");
  }

  getDetails = async key => {
    console.log(key);
    let user_type = {
      user_type: key
    };
    let rawResponse = await fetch("http://localhost:9000/logoutdetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user_type)
    });
    console.log(rawResponse);
    let content = await rawResponse.json();
    console.log(JSON.stringify(content));

    this.setState({ details: content.rows });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.type = this.props.user;
        console.log("Received values of form: ", values);
        const rawResponse = await fetch("http://localhost:9000/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });

        console.log(rawResponse);
        let content = await rawResponse.json();
        console.log(JSON.stringify(content.loggedout));
        if (content.loggedout === true) {
          success();
          this.props.form.resetFields();
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section>
        <h1 className="is-size-1" style={{ color: "white" }}>
        </h1>
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <Card bordered={false}>
                  <h1
                    className="is-size-2"
                    style={{ color: "black", textAlign: "center" }}
                  >
                    Security / Staff Logout
                  </h1>

                  <Card style={{ width: "400px" }}>
                  
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator("user_type", {
                        rules: [
                          {
                            required: true,
                            message: "Please select a user_type!"
                          }
                        ]
                      })(
                        <Select
                          placeholder="Select User Type"
                          onChange={this.getDetails}
                        >
                          <Select.Option value="security">Security
                          </Select.Option>
                          <Select.Option value="staff">Staff</Select.Option>
                          <Select.Option value="visitor">Visitor</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("username", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your username!"
                          }
                        ]
                      })(
                        this.state.details.length > 0 ? (
                          <Select>
                            {this.state.details.map(each => {
                              return (
                                <Select.Option value={each.username}>
                                  {each.username}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        ) : (
                          <div>no user</div>
                        )
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("userphone", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your userphone!"
                          }
                        ]
                      })(
                        this.state.details.length > 0 ? (
                          <Select>
                            {this.state.details.map(each => {
                              return (
                                <Select.Option value={each.phone}>
                                  {each.phone}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        ) : (
                          <div>no user</div>
                        )
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="logout-form-button"
                      >
                        Log out
                      </Button>
                    </Form.Item>
                  </Form>
                  </Card>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Modal visible={this.state.showModal}>
          <p>you have logged out successfully!</p>
        </Modal>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_logout" })(Logout);

export default WrappedNormalLoginForm;
