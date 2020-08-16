import React, { Component } from "react";
import {
  Icon,
  Form,
  Input,
  Button,
  Card,
  Select,
  InputNumber,
  Modal
} from "antd";
const { Option } = Select;

function success() {
  Modal.success({
    content: "loggedin"
  });
}
class Visitorpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      showModal: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.type = this.props.user;

        console.log("Received values of form: ", values);
        let rawResponse = await fetch("http://localhost:9000/Visitorpage", {
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
                  Visitor Information
                  </h1>
                  <Card style={{ width: "400px" }}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Item label="FIRST NAME">
                       {getFieldDecorator("fname", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your First name!"
                            }
                          ]
                        })(<Input placeholder="FirstName" />)}
                      </Form.Item>
                      <Form.Item label="LAST NAME">
                        {getFieldDecorator("lname", {
                          rules: [
                            {
                              required: false
                            }
                          ]
                        })(<Input placeholder="LastName" />)}
                      </Form.Item>
                      <Form.Item label="NUMBER OF VISITORS:">
                        {getFieldDecorator("num", {
                          rules: [
                            {
                              required: false
                            }
                          ]
                        })(
                          <InputNumber
                            min={1}
                            max={20}
                            defaultValue={1}
                            onChange={console.log("changed")}
                          />
                        )}
                      </Form.Item>
                      <Form.Item label="PHONE">
                        {getFieldDecorator("phone", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your Phone Number!"
                            }
                          ]
                        })(
                          <Input
                            prefix={<Icon type="phone" />}
                            placeholder="1234587635"
                          />
                        )}
                      </Form.Item>
                      <Form.Item label="Relation">
                        {getFieldDecorator("relation", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your Relation!"
                            }
                          ]
                        })(<Input placeholder="AUNTY/UNCLE" />)}
                      </Form.Item>
                      <Form.Item label="VEHICLE">
                        {getFieldDecorator("vehicle", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your Vehicle Number!"
                            }
                          ]
                        })(
                          <Input
                            prefix={<Icon type="car" />}
                            placeholder="AB-**-X-****"
                          />
                        )}
                      </Form.Item>
                      <Form.Item label="Flatno.">
                        {getFieldDecorator("flat", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter visiting Flat Number!"
                            }
                          ]
                        })(<Input placeholder="001" />)}
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="visitor-form-button"
                        >
                          Submit
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
const WrappedDemo = Form.create({ name: "validate_other" })(Visitorpage);

export default WrappedDemo;
