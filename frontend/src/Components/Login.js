import React, { Component } from "react";
import { Radio, Card, Form, Icon, Input, Button, Modal, Select } from "antd";
import "./login.css";

function success() {
  Modal.success({
    content: "You have logged in successfully!!"
  });
}
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      showModal: false,
      details: []
    };
  }
  getDetails = async key => {
    console.log(key);
    let user_type = {
      user_type: key
    };
    let rawResponse = await fetch("http://localhost:9000/details", {
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
        let rawResponse = await fetch("http://localhost:9000/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });
        console.log(rawResponse);
        let content = await rawResponse.json();
        console.log(JSON.stringify(content.loggedin));
        if (content.loggedin === true) {
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
          {" "}
        </h1>{" "}
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <Card bordered={false}>
                  <h1
                    className="is-size-2"
                    style={{ color: "black", textAlign: "center" }}
                  >
                    Security / Staff Login
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
                          <Select.Option value="security">
                            Security
                          </Select.Option>
                          <Select.Option value="staff">
                            Staff
                          </Select.Option>
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
                          <div> no user </div>
                        )
                      )}
                    </Form.Item>
                        {this.state.details.length > 0 ? (
                    <Form.Item>
                      {getFieldDecorator("userphone", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your Userphone!"
                          }
                        ]
                      })(
                          <Select>
                            {this.state.details.map(each => {
                              return (
                                <Select.Option value={each.phone}>
                                  {each.phone}
                                </Select.Option>
                              );
                            })}
                          </Select>
                      )}
                    </Form.Item>
                        ) : (
                          <div> no user </div>
                        )}
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Log in
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
          <p> you have logged in successfully! </p>
        </Modal>
      </section>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedNormalLoginForm;
